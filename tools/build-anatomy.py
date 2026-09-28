"""Build the offline anatomy asset. Usage: python tools/build-anatomy.py SOURCE_DIR

Requires numpy and fast-simplification. SOURCE_DIR contains anatomy.glb and
skeleton.glb from BodyExplorer commit 7d04bf3c4de2bd9cb234dd51d7e6857c099afafd.
See assets/anatomy/NOTICE.md for source attribution and model licenses.
"""
import gzip, hashlib, json, struct, sys
from pathlib import Path
import numpy as np
import fast_simplification

source=Path(sys.argv[1]); output=Path(__file__).resolve().parents[1]/'assets/anatomy'
output.mkdir(parents=True,exist_ok=True)
hashes={'anatomy.glb':'6e84529b60b64cc8f8d5cef665fda932e359e828b66d0c2dd44ec1bd9d0bd01f','skeleton.glb':'894ed0e98a266b727a7e290f0d4123bb087c4afe84a48d55af71d1a351ca99a5'}
terms=['latissimus','trapezius','deltoid','biceps brachii','triceps','brachialis','rhomboid','teres major','infraspinatus','teres minor','pectoralis major','serratus anterior','external oblique','rectus abdominis','sternocleidomastoid','temporalis','masseter','occipito','orbicularis','buccinator','frontalis','platysma','brachioradialis','flexor carpi','extensor carpi','extensor digitorum','flexor digitorum','pronator teres','anconeus','gluteus maximus','gluteus medius','rectus femoris','vastus','biceps femoris','semimembranosus','semitendinosus','gastrocnemius','soleus','adductor','tibialis','fibularis','iliocostalis','longissimus thoracis','spinalis thoracis']
points=[];faces=[];parts=[];nv=ni=0
for file in hashes:
    raw=(source/file).read_bytes()
    if hashlib.sha256(raw).hexdigest()!=hashes[file]:raise ValueError('Unexpected source hash: '+file)
    size=struct.unpack_from('<I',raw,12)[0];doc=json.loads(raw[20:20+size]);buf=raw[28+size:]
    def read(i):
        a=doc['accessors'][i];v=doc['bufferViews'][a['bufferView']]
        dtype={5126:'<f4',5125:'<u4',5123:'<u2',5121:'u1'}[a['componentType']]
        width={'SCALAR':1,'VEC3':3}[a['type']]
        return np.frombuffer(buf,dtype=dtype,count=a['count']*width,offset=v.get('byteOffset',0)+a.get('byteOffset',0)).reshape(a['count'],width).copy()
    for mesh in doc['meshes']:
        name=mesh.get('name','').lower();bone=file=='skeleton.glb'
        if not bone and not any(t in name for t in terms):continue
        pr=mesh['primitives'][0];p=read(pr['attributes']['POSITION']);f=read(pr['indices']).reshape(-1,3)
        target=150 if bone else 320
        if not bone and any(t in name for t in ['latissimus','trapezius','deltoid','triceps','biceps brachii','pectoralis major','rectus abdominis','external oblique','gluteus maximus','rectus femoris','vastus','biceps femoris','semimembranosus','semitendinosus','gastrocnemius','soleus']):target=1200
        if bone and any(t in name for t in ['frontal bone','parietal','occipital','temporal bone','mandible','maxilla']):target=1100
        if len(f)>target:p,f=fast_simplification.simplify(p.astype(np.float64),f.astype(np.int32),target_count=target)
        used,remap=np.unique(f,return_inverse=True);p=p[used];f=remap.reshape(-1,3).astype(np.int32)
        p=np.column_stack([p[:,0],p[:,2]-1190,-p[:,1]-80])/350
        points.append(p);faces.append(f+nv)
        parts.append({'name':name,'bone':bone,'vertexStart':nv,'vertexCount':len(p),'indexStart':ni,'indexCount':int(f.size),'min':p.min(0).round(5).tolist(),'max':p.max(0).round(5).tolist()})
        nv+=len(p);ni+=f.size
p=np.concatenate(points);f=np.concatenate(faces)
quantized=np.round(p*8000)
if quantized.min()<-32768 or quantized.max()>32767:raise ValueError('Coordinate overflow')
packed=b'F50A'+struct.pack('<III',1,nv,ni)+quantized.astype('<i2').tobytes()+f.astype('<u4').tobytes()
compressed=gzip.compress(packed,compresslevel=9,mtime=0)
chunks=[]
for i,start in enumerate(range(0,len(compressed),98304),1):
    name=f'body-{i:02d}.bin';chunks.append(name)
    (output/name).write_bytes(compressed[start:start+98304])
for old in output.glob('body-*.bin'):
    if old.name not in chunks:old.unlink()
(output/'parts.json').write_text(json.dumps({'version':1,'positionScale':8000,'vertexCount':nv,'indexCount':ni,'chunks':chunks,'compressedBytes':len(compressed),'parts':parts},separators=(',',':'))+'\n')
print(f'{len(parts)} parts, {nv:,} vertices, {ni//3:,} triangles; {len(compressed):,} compressed bytes')
