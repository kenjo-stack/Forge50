/* Original Forge50 GIF assets. Stable exercise IDs and existing demonstrations are preserved. */
(function(){
  const data={
  "version": "original-gifs-v2",
  "baseVersion": "2.12.1",
  "assets": {
    "incline-dumbbell-fly": {
      "name": "Incline Dumbbell Fly",
      "gif": "assets/exercise-demos/gifs/incline-dumbbell-fly.gif",
      "poster": "assets/exercise-demos/posters/incline-dumbbell-fly.jpg",
      "bytes": 893589,
      "sha256": "5e9f58c970ab605fcebf189d8791decc5f389955cb8f5748dc86f89f4d3553be"
    },
    "cable-chest-press": {
      "name": "Cable Chest Press",
      "gif": "assets/exercise-demos/gifs/cable-chest-press.gif",
      "poster": "assets/exercise-demos/posters/cable-chest-press.jpg",
      "bytes": 1320604,
      "sha256": "305300e87a43d65f67d42aa06209e20bb0816444011196a970a5d36e249129bb"
    },
    "flat-dumbbell-press": {
      "name": "Flat Dumbbell Press",
      "gif": "assets/exercise-demos/gifs/flat-dumbbell-press.gif",
      "poster": "assets/exercise-demos/posters/flat-dumbbell-press.jpg",
      "bytes": 1128721,
      "sha256": "8634c2f1a8d689d07cfd147023b9d8ff9c731e071f5a2e4c04e73df2e82fc2cd"
    },
    "high-to-low-cable-fly": {
      "name": "High-to-Low Cable Fly",
      "gif": "assets/exercise-demos/gifs/high-to-low-cable-fly.gif",
      "poster": "assets/exercise-demos/posters/high-to-low-cable-fly.jpg",
      "bytes": 1306702,
      "sha256": "e053d6cd5e8b409945bd4c86573d1a0536dc31a6c9563665412f50787ef01c88"
    },
    "incline-dumbbell-press": {
      "name": "Incline Dumbbell Press",
      "gif": "assets/exercise-demos/gifs/incline-dumbbell-press.gif",
      "poster": "assets/exercise-demos/posters/incline-dumbbell-press.jpg",
      "bytes": 1267912,
      "sha256": "4b5eb321064d6c1f01e2a3faccd8426a0ced5fbc174a79d438add2e50961f07d"
    },
    "low-to-high-cable-fly": {
      "name": "Low-to-High Cable Fly",
      "gif": "assets/exercise-demos/gifs/low-to-high-cable-fly.gif",
      "poster": "assets/exercise-demos/posters/low-to-high-cable-fly.jpg",
      "bytes": 1277114,
      "sha256": "77e8d4dc25382a48db02574ae39f1c6571561fc8d3e00d27b099bd44744a6076"
    },
    "machine-lower-chest-press": {
      "name": "Machine Lower Chest Press",
      "gif": "assets/exercise-demos/gifs/machine-lower-chest-press.gif",
      "poster": "assets/exercise-demos/posters/machine-lower-chest-press.jpg",
      "bytes": 1400017,
      "sha256": "3632b90c50a9d7da8b3146e365f0d5d525c1ee2bfa95045ce28189215d68fa93"
    },
    "close-grip-barbell-bench-press": {
      "name": "Close-Grip Barbell Bench Press",
      "gif": "assets/exercise-demos/gifs/close-grip-barbell-bench-press.gif",
      "poster": "assets/exercise-demos/posters/close-grip-barbell-bench-press.jpg",
      "bytes": 1345708,
      "sha256": "414bf11b82c7d26881744c45a72ae446f75eca7dac745acad30b7b8bff3eb7dc"
    },
    "overhead-cable-triceps-extension": {
      "name": "Overhead Cable Triceps Extension",
      "gif": "assets/exercise-demos/gifs/overhead-cable-triceps-extension.gif",
      "poster": "assets/exercise-demos/posters/overhead-cable-triceps-extension.jpg",
      "bytes": 1274580,
      "sha256": "c7c0e2e6faa7335a3cd132d5a5f51446982d059adc081cf1dfe2141dccfe625d"
    },
    "reverse-grip-cable-triceps-pushdown": {
      "name": "Reverse-Grip Cable Triceps Pushdown",
      "gif": "assets/exercise-demos/gifs/reverse-grip-cable-triceps-pushdown.gif",
      "poster": "assets/exercise-demos/posters/reverse-grip-cable-triceps-pushdown.jpg",
      "bytes": 1304011,
      "sha256": "5b43af7a8faba87f8fbf1d72302c4e376fc030f5476bf69aca77a053bf31cc38"
    },
    "rope-triceps-pushdown": {
      "name": "Rope Triceps Pushdown",
      "gif": "assets/exercise-demos/gifs/rope-triceps-pushdown.gif",
      "poster": "assets/exercise-demos/posters/rope-triceps-pushdown.jpg",
      "bytes": 1299445,
      "sha256": "9c26fee810c03724a7a192c4023acd9380b592f454f5a480a45be65a5d42200a"
    },
    "skull-crushers": {
      "name": "Skull Crushers",
      "gif": "assets/exercise-demos/gifs/skull-crushers.gif",
      "poster": "assets/exercise-demos/posters/skull-crushers.jpg",
      "bytes": 1277621,
      "sha256": "9cb86c90ca3f74a15456820e04cd3662f289a04c135d8183e5ab2b9bd3f14b8d"
    },
    "triceps-extension-machine": {
      "name": "Triceps Extension Machine",
      "gif": "assets/exercise-demos/gifs/triceps-extension-machine.gif",
      "poster": "assets/exercise-demos/posters/triceps-extension-machine.jpg",
      "bytes": 1330583,
      "sha256": "54af4f2089165e5244a5d7e64cb12e3ea1825a97930a1c57e0483b4cedb253da"
    },
    "cable-curl": {
      "name": "Cable Curl",
      "gif": "assets/exercise-demos/gifs/cable-curl.gif",
      "poster": "assets/exercise-demos/posters/cable-curl.jpg",
      "bytes": 1256653,
      "sha256": "148015ab6181283e332cdf81a106802b6a4903d81080004ed74b85214f337d33"
    },
    "ez-bar-curl": {
      "name": "EZ-Bar Curl",
      "gif": "assets/exercise-demos/gifs/ez-bar-curl.gif",
      "poster": "assets/exercise-demos/posters/ez-bar-curl.jpg",
      "bytes": 1235701,
      "sha256": "ad1d4598e1f380f1dec9fa76b5245019714a14be36abc0c4c7bcbf7c035ba543"
    },
    "hammer-curl": {
      "name": "Hammer Curl",
      "gif": "assets/exercise-demos/gifs/hammer-curl.gif",
      "poster": "assets/exercise-demos/posters/hammer-curl.jpg",
      "bytes": 1250864,
      "sha256": "9488028e0a0c5e20ee68169a7242e9c777f2c7d957c4dc722f9457476f93681e"
    },
    "incline-dumbbell-curl": {
      "name": "Incline Dumbbell Curl",
      "gif": "assets/exercise-demos/gifs/incline-dumbbell-curl.gif",
      "poster": "assets/exercise-demos/posters/incline-dumbbell-curl.jpg",
      "bytes": 1285426,
      "sha256": "c1fdfacdfc7610d8a99c1fd495bf0a7ad32eb36dcc13c009d93d63a8be494992"
    },
    "preacher-curl": {
      "name": "Preacher Curl",
      "gif": "assets/exercise-demos/gifs/preacher-curl.gif",
      "poster": "assets/exercise-demos/posters/preacher-curl.jpg",
      "bytes": 1242702,
      "sha256": "f43be99b965244a44102f0bb8a3831278a1017b3dd210056e87eff648089b924"
    },
    "cable-lateral-raise": {
      "name": "Cable Lateral Raise",
      "gif": "assets/exercise-demos/gifs/cable-lateral-raise.gif",
      "poster": "assets/exercise-demos/posters/cable-lateral-raise.jpg",
      "bytes": 1317397,
      "sha256": "c50bb4c98639f0eff15a08d3e8483ed72424958ec415d753e92e9d17eed350e6"
    },
    "dumbbell-lateral-raise": {
      "name": "Dumbbell Lateral Raise",
      "gif": "assets/exercise-demos/gifs/dumbbell-lateral-raise.gif",
      "poster": "assets/exercise-demos/posters/dumbbell-lateral-raise.jpg",
      "bytes": 1202402,
      "sha256": "98424462a10ca15547954e50a72e6cc3a22c0136973a76dde4c89aa40fb0e5a4"
    },
    "dumbbell-shoulder-press": {
      "name": "Dumbbell Shoulder Press",
      "gif": "assets/exercise-demos/gifs/dumbbell-shoulder-press.gif",
      "poster": "assets/exercise-demos/posters/dumbbell-shoulder-press.jpg",
      "bytes": 1275941,
      "sha256": "f5c16ce786d4a86e2aeea3f3a7163a1458a0ed335d2e09e7d5cae14945d4762c"
    },
    "high-face-pull": {
      "name": "High Face Pull",
      "gif": "assets/exercise-demos/gifs/high-face-pull.gif",
      "poster": "assets/exercise-demos/posters/high-face-pull.jpg",
      "bytes": 1206354,
      "sha256": "47b629c4233110c6799e650f9dfea1b62f91a869b7854dcfce70de4070addfab"
    },
    "machine-lateral-raise": {
      "name": "Machine Lateral Raise",
      "gif": "assets/exercise-demos/gifs/machine-lateral-raise.gif",
      "poster": "assets/exercise-demos/posters/machine-lateral-raise.jpg",
      "bytes": 1363977,
      "sha256": "cb8f38e6db14ab0af876ccd19d256e0ec5bbda31593d61ce6191f0b2c8e6055f"
    },
    "reverse-pec-deck": {
      "name": "Reverse Pec Deck",
      "gif": "assets/exercise-demos/gifs/reverse-pec-deck.gif",
      "poster": "assets/exercise-demos/posters/reverse-pec-deck.jpg",
      "bytes": 1338295,
      "sha256": "a6736f12bbfdee3e6ebbc06237472ffa177ea7be778aa6158debd8ec95104338"
    },
    "seated-machine-front-raise": {
      "name": "Seated Machine Front Raise",
      "gif": "assets/exercise-demos/gifs/seated-machine-front-raise.gif",
      "poster": "assets/exercise-demos/posters/seated-machine-front-raise.jpg",
      "bytes": 1300688,
      "sha256": "af08c75dfa5b71caf295f53eaf4d732b210c48051bdde934bccaf16686195d2f"
    },
    "cable-crunch": {
      "name": "Cable Crunch",
      "gif": "assets/exercise-demos/gifs/cable-crunch.gif",
      "poster": "assets/exercise-demos/posters/cable-crunch.jpg",
      "bytes": 1344215,
      "sha256": "47f49205efeb32dbd305b0cb6246182d6fbd5f1c9ab864eb4e136875fbef6c14"
    },
    "machine-ab-crunch": {
      "name": "Machine Ab Crunch",
      "gif": "assets/exercise-demos/gifs/machine-ab-crunch.gif",
      "poster": "assets/exercise-demos/posters/machine-ab-crunch.jpg",
      "bytes": 1312339,
      "sha256": "8dbf50cd034419238af215adb3cf006d27b450e401fdc3f824a86ae05dcac836"
    },
    "pallof-press": {
      "name": "Pallof Press",
      "gif": "assets/exercise-demos/gifs/pallof-press.gif",
      "poster": "assets/exercise-demos/posters/pallof-press.jpg",
      "bytes": 1178061,
      "sha256": "ebcf2dd20c93faedbb8e730ab193adbda020ea9721c462f547645deddb758ffe"
    },
    "leg-extension": {
      "name": "Leg Extension",
      "gif": "assets/exercise-demos/gifs/leg-extension.gif",
      "poster": "assets/exercise-demos/posters/leg-extension.jpg",
      "bytes": 1313791,
      "sha256": "cc2098225961c8e6d5d587cdff29e5960513afc7b0438192dfff56be97590c45"
    },
    "leg-press": {
      "name": "Leg Press",
      "gif": "assets/exercise-demos/gifs/leg-press.gif",
      "poster": "assets/exercise-demos/posters/leg-press.jpg",
      "bytes": 1348623,
      "sha256": "f82ce324a6bd1cb85b03b50fdd579be53744a68345e27585a3d148e2ae4b862c"
    },
    "machine-calf-raise": {
      "name": "Machine Calf Raise",
      "gif": "assets/exercise-demos/gifs/machine-calf-raise.gif",
      "poster": "assets/exercise-demos/posters/machine-calf-raise.jpg",
      "bytes": 1343421,
      "sha256": "33e77cdd7bfa79b680bd12c08e601fc794d9bc896da8f9cf07d092bcf0ad349a"
    },
    "romanian-deadlift": {
      "name": "Romanian Deadlift",
      "gif": "assets/exercise-demos/gifs/romanian-deadlift.gif",
      "poster": "assets/exercise-demos/posters/romanian-deadlift.jpg",
      "bytes": 1126476,
      "sha256": "c19321eafb96ec9c85b78ed8cebaf1b35b875e2b97da7f4ca5433dec3ad7c515"
    },
    "seated-leg-curl": {
      "name": "Seated Leg Curl",
      "gif": "assets/exercise-demos/gifs/seated-leg-curl.gif",
      "poster": "assets/exercise-demos/posters/seated-leg-curl.jpg",
      "bytes": 1367604,
      "sha256": "23f092313c676c46ab813afddb48e92d7c9a9d6d3380039894817263f0e12682"
    },
    "assisted-pull-up": {
      "name": "Assisted Pull-Up",
      "gif": "assets/exercise-demos/gifs/assisted-pull-up.gif",
      "poster": "assets/exercise-demos/posters/assisted-pull-up.jpg",
      "bytes": 1356088,
      "sha256": "7e066f4ef074c27556bca5d4e070b83b8d66bdba1618178df280898d62e1dbef"
    },
    "chest-supported-row": {
      "name": "Chest-Supported Row",
      "gif": "assets/exercise-demos/gifs/chest-supported-row.gif",
      "poster": "assets/exercise-demos/posters/chest-supported-row.jpg",
      "bytes": 1253317,
      "sha256": "9761d0b6e11baa900aa6760584ae5a25ef6bd25bb11c4656e1870244517a055d"
    },
    "high-row-machine": {
      "name": "High Row Machine",
      "gif": "assets/exercise-demos/gifs/high-row-machine.gif",
      "poster": "assets/exercise-demos/posters/high-row-machine.jpg",
      "bytes": 1394258,
      "sha256": "9185870dad3f5d165df6f11d2279f860a0756ed534264392fcc2dac35d404508"
    },
    "lat-pulldown": {
      "name": "Lat Pulldown",
      "gif": "assets/exercise-demos/gifs/lat-pulldown.gif",
      "poster": "assets/exercise-demos/posters/lat-pulldown.jpg",
      "bytes": 1313704,
      "sha256": "093ade75fe9f3df04d6116794e27f9281eeb12e7ad3a0cf7cade53a01edd6d74"
    },
    "seated-cable-row": {
      "name": "Seated Cable Row",
      "gif": "assets/exercise-demos/gifs/seated-cable-row.gif",
      "poster": "assets/exercise-demos/posters/seated-cable-row.jpg",
      "bytes": 1281608,
      "sha256": "2fc909b8320d5ef3f92ab72d12e4ce4399a06a4b506ce7502a3c19cbe73c99ef"
    },
    "single-arm-cable-row": {
      "name": "Single-Arm Cable Row",
      "gif": "assets/exercise-demos/gifs/single-arm-cable-row.gif",
      "poster": "assets/exercise-demos/posters/single-arm-cable-row.jpg",
      "bytes": 1282119,
      "sha256": "4614486c8475a07b3119e5397233cafd6a2dc507e964723ddc48be87bace169a"
    },
    "straight-arm-pulldown": {
      "name": "Straight-Arm Cable Pulldown",
      "gif": "assets/exercise-demos/gifs/straight-arm-pulldown.gif",
      "poster": "assets/exercise-demos/posters/straight-arm-pulldown.jpg",
      "bytes": 1310414,
      "sha256": "b20ae03e971ad0c77c7ae9a57ea41eea5d65a98d8c9cd79ff724ba50b805d580"
    },
    "machine-chest-press": {
      "name": "Machine Chest Press",
      "gif": "assets/exercise-demos/gifs/machine-chest-press.gif",
      "poster": "assets/exercise-demos/posters/machine-chest-press.jpg",
      "bytes": 1200818,
      "sha256": "ae0d51c9638dd2a29c806a5c6f7a6157af9b2a98d2c0e1b79a2dc1527409d257",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "dumbbell-floor-press": {
      "name": "Dumbbell Floor Press",
      "gif": "assets/exercise-demos/gifs/dumbbell-floor-press.gif",
      "poster": "assets/exercise-demos/posters/dumbbell-floor-press.jpg",
      "bytes": 1009297,
      "sha256": "b54e27365a11272eb98a81053a9b6a065a5b69f7ca2e750f0e0a41e9164ceade",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "flat-dumbbell-fly": {
      "name": "Flat Dumbbell Fly",
      "gif": "assets/exercise-demos/gifs/flat-dumbbell-fly.gif",
      "poster": "assets/exercise-demos/posters/flat-dumbbell-fly.jpg",
      "bytes": 893322,
      "sha256": "d6db98c8fef25cd43f9ee32047f893b5863926de8d18a361847f1d8b75a13867",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "pec-deck-fly": {
      "name": "Pec Deck Fly",
      "gif": "assets/exercise-demos/gifs/pec-deck-fly.gif",
      "poster": "assets/exercise-demos/posters/pec-deck-fly.jpg",
      "bytes": 1065654,
      "sha256": "3bbeee98f9b2b310c2c3c468323860232f43694c5d76fc65ee6ace3e32edb7a6",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "machine-shoulder-press": {
      "name": "Machine Shoulder Press",
      "gif": "assets/exercise-demos/gifs/machine-shoulder-press.gif",
      "poster": "assets/exercise-demos/posters/machine-shoulder-press.jpg",
      "bytes": 958009,
      "sha256": "66b80359b4fb1c5fb85fb0532f401097df492a7892c2b8fc30b06971e6ccef6c",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "seated-barbell-shoulder-press": {
      "name": "Seated Barbell Shoulder Press",
      "gif": "assets/exercise-demos/gifs/seated-barbell-shoulder-press.gif",
      "poster": "assets/exercise-demos/posters/seated-barbell-shoulder-press.jpg",
      "bytes": 994122,
      "sha256": "f9153f5bdb029a84b4292f84db27dd3b988b04641d70885d4a7c63104cadd62f",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "leaning-dumbbell-lateral-raise": {
      "name": "Leaning Dumbbell Lateral Raise",
      "gif": "assets/exercise-demos/gifs/leaning-dumbbell-lateral-raise.gif",
      "poster": "assets/exercise-demos/posters/leaning-dumbbell-lateral-raise.jpg",
      "bytes": 876491,
      "sha256": "a286853dacecc51430158ec61e433ee72fb94687eeb0c81166caa3762d4c32ee",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "bent-over-dumbbell-reverse-fly": {
      "name": "Bent-Over Dumbbell Reverse Fly",
      "gif": "assets/exercise-demos/gifs/bent-over-dumbbell-reverse-fly.gif",
      "poster": "assets/exercise-demos/posters/bent-over-dumbbell-reverse-fly.jpg",
      "bytes": 905137,
      "sha256": "4f37f8b9a1866db416538dd6160aa12c79249f3f2f03f9f5b37bfa9585cb4cdb",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "cable-rear-delt-fly": {
      "name": "Cable Rear Delt Fly",
      "gif": "assets/exercise-demos/gifs/cable-rear-delt-fly.gif",
      "poster": "assets/exercise-demos/posters/cable-rear-delt-fly.jpg",
      "bytes": 1245468,
      "sha256": "f8e82213a2da816727f30cd1491d6994fef557381ad002ce1b8f3c97e4454f13",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "rope-face-pull": {
      "name": "Rope Face Pull",
      "gif": "assets/exercise-demos/gifs/rope-face-pull.gif",
      "poster": "assets/exercise-demos/posters/rope-face-pull.jpg",
      "bytes": 809818,
      "sha256": "2555af9ecd371bdf25b9edec70c8d8a0affd54929c8ae69817cb1e2547dbcba6",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "seated-cable-face-pull": {
      "name": "Seated Cable Face Pull",
      "gif": "assets/exercise-demos/gifs/seated-cable-face-pull.gif",
      "poster": "assets/exercise-demos/posters/seated-cable-face-pull.jpg",
      "bytes": 994819,
      "sha256": "5fb6caa70ebfee22df7cefe1bbdcc173ae4fe36fe8a144328cae22f4af3fc841",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "one-arm-dumbbell-row": {
      "name": "One-Arm Dumbbell Row",
      "gif": "assets/exercise-demos/gifs/one-arm-dumbbell-row.gif",
      "poster": "assets/exercise-demos/posters/one-arm-dumbbell-row.jpg",
      "bytes": 1008932,
      "sha256": "c6dc3df4cc25c6b0ede79fc5f1c725bae9944155b0588258a0f71db6551a4c56",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "neutral-grip-lat-pulldown": {
      "name": "Neutral-Grip Lat Pulldown",
      "gif": "assets/exercise-demos/gifs/neutral-grip-lat-pulldown.gif",
      "poster": "assets/exercise-demos/posters/neutral-grip-lat-pulldown.jpg",
      "bytes": 1160595,
      "sha256": "698d30bbc230956fa9364c1cac7e6a9802c392343ec85c032c0345951c2ed38c",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "lying-cable-pullover": {
      "name": "Lying Cable Pullover",
      "gif": "assets/exercise-demos/gifs/lying-cable-pullover.gif",
      "poster": "assets/exercise-demos/posters/lying-cable-pullover.jpg",
      "bytes": 1126861,
      "sha256": "366d599b0ecfac668313d6f2c0b9ae6cf4416336a586b3b2bfacd8e3bfcbf425",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "dumbbell-pullover": {
      "name": "Dumbbell Pullover",
      "gif": "assets/exercise-demos/gifs/dumbbell-pullover.gif",
      "poster": "assets/exercise-demos/posters/dumbbell-pullover.jpg",
      "bytes": 827711,
      "sha256": "cdfdf5fc33ada663d46bf1730917c6b29bcfc867839004c591d2c2db34b99fcb",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "standing-dumbbell-curl": {
      "name": "Standing Dumbbell Curl",
      "gif": "assets/exercise-demos/gifs/standing-dumbbell-curl.gif",
      "poster": "assets/exercise-demos/posters/standing-dumbbell-curl.jpg",
      "bytes": 645536,
      "sha256": "4939c22d2c6a4e6ad639e89c808876ea818242893f247d35869aca2ad1c42205",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "dumbbell-overhead-triceps-extension": {
      "name": "Dumbbell Overhead Triceps Extension",
      "gif": "assets/exercise-demos/gifs/dumbbell-overhead-triceps-extension.gif",
      "poster": "assets/exercise-demos/posters/dumbbell-overhead-triceps-extension.jpg",
      "bytes": 972494,
      "sha256": "c02e4e87aa6a0fd11cf5f9c9f4aeda98b3c1741c900925ba130467bc8cdafbbb",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "close-grip-machine-chest-press": {
      "name": "Close-Grip Machine Chest Press",
      "gif": "assets/exercise-demos/gifs/close-grip-machine-chest-press.gif",
      "poster": "assets/exercise-demos/posters/close-grip-machine-chest-press.jpg",
      "bytes": 1281052,
      "sha256": "bd3feb488f92872c1ec506699a77aa6a76f692a45e866aaf57808f94126513ae",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "dumbbell-front-raise": {
      "name": "Dumbbell Front Raise",
      "gif": "assets/exercise-demos/gifs/dumbbell-front-raise.gif",
      "poster": "assets/exercise-demos/posters/dumbbell-front-raise.jpg",
      "bytes": 667530,
      "sha256": "c289d0d3a0db9680cf5afba998aa140c7f1eaf19e43a9b84fd1f35ac18a8a3b4",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "cable-front-raise": {
      "name": "Cable Front Raise",
      "gif": "assets/exercise-demos/gifs/cable-front-raise.gif",
      "poster": "assets/exercise-demos/posters/cable-front-raise.jpg",
      "bytes": 1021859,
      "sha256": "f5cc93f0b5090bfdf7f03f300ea1dd3852dbb5d544604dbc80d9f0d0f46ba027",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "dumbbell-romanian-deadlift": {
      "name": "Dumbbell Romanian Deadlift",
      "gif": "assets/exercise-demos/gifs/dumbbell-romanian-deadlift.gif",
      "poster": "assets/exercise-demos/posters/dumbbell-romanian-deadlift.jpg",
      "bytes": 750876,
      "sha256": "f295fd9d5ea7d28fb36760f1438cfd9a1602d04e9548cd598aa61073be3d55af",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "cable-pull-through": {
      "name": "Cable Pull-Through",
      "gif": "assets/exercise-demos/gifs/cable-pull-through.gif",
      "poster": "assets/exercise-demos/posters/cable-pull-through.jpg",
      "bytes": 665416,
      "sha256": "c73389c17e76c0900f422d2d4dc3592c94b4af6b0d82138b81853a9de2af00b2",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "goblet-squat": {
      "name": "Goblet Squat",
      "gif": "assets/exercise-demos/gifs/goblet-squat.gif",
      "poster": "assets/exercise-demos/posters/goblet-squat.jpg",
      "bytes": 747489,
      "sha256": "cd0eca2480921cf4ba849c48c2a13a3ff7aaa15d72954d778c38c33fd81e49da",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "smith-machine-squat": {
      "name": "Smith Machine Squat",
      "gif": "assets/exercise-demos/gifs/smith-machine-squat.gif",
      "poster": "assets/exercise-demos/posters/smith-machine-squat.jpg",
      "bytes": 884668,
      "sha256": "8e082eb0d9846f3a5b2c5ec08269b85c19795be24ece264ee356f730fc2fae47",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "hack-squat": {
      "name": "Hack Squat",
      "gif": "assets/exercise-demos/gifs/hack-squat.gif",
      "poster": "assets/exercise-demos/posters/hack-squat.jpg",
      "bytes": 1143241,
      "sha256": "503ed1728df89232cd7223f327533ed7252ebfe0729090dcf1256552ef0e4cbb",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "single-leg-extension": {
      "name": "Single-Leg Extension",
      "gif": "assets/exercise-demos/gifs/single-leg-extension.gif",
      "poster": "assets/exercise-demos/posters/single-leg-extension.jpg",
      "bytes": 1267255,
      "sha256": "35db4fc4ae0bb25c69ae8abceabeb202124102983219a792c28922755d7cb12c",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "cable-leg-extension": {
      "name": "Cable Leg Extension",
      "gif": "assets/exercise-demos/gifs/cable-leg-extension.gif",
      "poster": "assets/exercise-demos/posters/cable-leg-extension.jpg",
      "bytes": 857722,
      "sha256": "617bc99643ce2a1884a4f1e50e35951499d70792bbc70e4d2b7444a4d3df7dc4",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "lying-leg-curl": {
      "name": "Lying Leg Curl",
      "gif": "assets/exercise-demos/gifs/lying-leg-curl.gif",
      "poster": "assets/exercise-demos/posters/lying-leg-curl.jpg",
      "bytes": 1323300,
      "sha256": "630c8ba57b9890e27489d16ab8a4a8804e91b0a3ee6c5b988e8b83a64aa11175",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "standing-leg-curl": {
      "name": "Standing Leg Curl",
      "gif": "assets/exercise-demos/gifs/standing-leg-curl.gif",
      "poster": "assets/exercise-demos/posters/standing-leg-curl.jpg",
      "bytes": 877310,
      "sha256": "77435cf4114aef13588ecda5bb134e8c2fec9276a2339cb799e048ea059c4c73",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "standing-dumbbell-calf-raise": {
      "name": "Standing Dumbbell Calf Raise",
      "gif": "assets/exercise-demos/gifs/standing-dumbbell-calf-raise.gif",
      "poster": "assets/exercise-demos/posters/standing-dumbbell-calf-raise.jpg",
      "bytes": 688754,
      "sha256": "2aa2718211498c7570f931daac063153899a2bdc295ed681b354f9e992c06445",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "seated-calf-raise": {
      "name": "Seated Calf Raise",
      "gif": "assets/exercise-demos/gifs/seated-calf-raise.gif",
      "poster": "assets/exercise-demos/posters/seated-calf-raise.jpg",
      "bytes": 874542,
      "sha256": "2eaa942cc95a48160abf0646c67b5c2207cccc350afa631284ace858c9f3e206",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "decline-crunch": {
      "name": "Decline Crunch",
      "gif": "assets/exercise-demos/gifs/decline-crunch.gif",
      "poster": "assets/exercise-demos/posters/decline-crunch.jpg",
      "bytes": 923177,
      "sha256": "c212e7174195b444ae4b6a2bbce910332820de072899f58dee9d33601d7ecbd1",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "tall-kneeling-pallof-press": {
      "name": "Tall-Kneeling Pallof Press",
      "gif": "assets/exercise-demos/gifs/tall-kneeling-pallof-press.gif",
      "poster": "assets/exercise-demos/posters/tall-kneeling-pallof-press.jpg",
      "bytes": 991331,
      "sha256": "9b2a3fcfe28f468a7c17a64d59ce41731a575d5db1899a60d7258e7389d0b10a",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "half-kneeling-pallof-press": {
      "name": "Half-Kneeling Pallof Press",
      "gif": "assets/exercise-demos/gifs/half-kneeling-pallof-press.gif",
      "poster": "assets/exercise-demos/posters/half-kneeling-pallof-press.jpg",
      "bytes": 1026721,
      "sha256": "cc212024715844ed6642361c376d3a406fdd47781367ebc94ac72a9ee1537792",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    },
    "machine-seated-row": {
      "name": "Machine Seated Row (Chest-Supported)",
      "gif": "assets/exercise-demos/gifs/machine-seated-row.gif",
      "poster": "assets/exercise-demos/posters/machine-seated-row.jpg",
      "bytes": 1238583,
      "sha256": "315a2643e82e70206243308168604f769554937e0d8566396ff346e744e04f90",
      "frames": 8,
      "durationMs": 2400,
      "distinctFrames": 8
    }
  },
  "exercises": {
    "incline-dumbbell-fly": [
      "incline-dumbbell-fly"
    ],
    "hack-squat": [
      "hack-squat"
    ],
    "cable-chest-press": [
      "cable-chest-press"
    ],
    "straight-arm-pulldown": [
      "straight-arm-pulldown"
    ],
    "cable-lateral-raise": [
      "cable-lateral-raise"
    ],
    "machine-ab-crunch": [
      "machine-ab-crunch"
    ],
    "incline-dumbbell-press": [
      "incline-dumbbell-press"
    ],
    "high-to-low-cable-fly": [
      "high-to-low-cable-fly"
    ],
    "low-to-high-cable-fly": [
      "low-to-high-cable-fly"
    ],
    "machine-lower-chest-press": [
      "machine-lower-chest-press"
    ],
    "close-grip-barbell-bench-press": [
      "close-grip-barbell-bench-press"
    ],
    "skull-crushers": [
      "skull-crushers"
    ],
    "rope-triceps-pushdown": [
      "rope-triceps-pushdown"
    ],
    "reverse-grip-cable-triceps-pushdown": [
      "reverse-grip-cable-triceps-pushdown"
    ],
    "cable-crunch": [
      "cable-crunch"
    ],
    "romanian-deadlift": [
      "romanian-deadlift"
    ],
    "lat-pulldown": [
      "lat-pulldown"
    ],
    "chest-supported-row": [
      "chest-supported-row"
    ],
    "seated-cable-row": [
      "seated-cable-row"
    ],
    "ez-bar-curl": [
      "ez-bar-curl"
    ],
    "incline-dumbbell-curl": [
      "incline-dumbbell-curl"
    ],
    "preacher-curl": [
      "preacher-curl"
    ],
    "dumbbell-shoulder-press": [
      "dumbbell-shoulder-press"
    ],
    "dumbbell-lateral-raise": [
      "dumbbell-lateral-raise"
    ],
    "reverse-pec-deck": [
      "reverse-pec-deck"
    ],
    "seated-machine-front-raise": [
      "seated-machine-front-raise"
    ],
    "machine-lateral-raise": [
      "machine-lateral-raise"
    ],
    "overhead-cable-triceps-extension": [
      "overhead-cable-triceps-extension"
    ],
    "triceps-extension-machine": [
      "triceps-extension-machine"
    ],
    "high-row-machine-assisted-pull-up": [
      "high-row-machine",
      "assisted-pull-up"
    ],
    "single-arm-cable-row": [
      "single-arm-cable-row"
    ],
    "high-face-pull": [
      "high-face-pull"
    ],
    "cable-curl": [
      "cable-curl"
    ],
    "hammer-curl": [
      "hammer-curl"
    ],
    "leg-press": [
      "leg-press"
    ],
    "seated-leg-curl": [
      "seated-leg-curl"
    ],
    "leg-extension": [
      "leg-extension"
    ],
    "machine-calf-raise": [
      "machine-calf-raise"
    ],
    "high-row-machine": [
      "high-row-machine"
    ],
    "pallof-press": [
      "pallof-press"
    ],
    "flat-dumbbell-press": [
      "flat-dumbbell-press"
    ],
    "machine-chest-press": [
      "machine-chest-press"
    ],
    "dumbbell-floor-press": [
      "dumbbell-floor-press"
    ],
    "flat-dumbbell-fly": [
      "flat-dumbbell-fly"
    ],
    "pec-deck-fly": [
      "pec-deck-fly"
    ],
    "machine-shoulder-press": [
      "machine-shoulder-press"
    ],
    "seated-barbell-shoulder-press": [
      "seated-barbell-shoulder-press"
    ],
    "leaning-dumbbell-lateral-raise": [
      "leaning-dumbbell-lateral-raise"
    ],
    "bent-over-dumbbell-reverse-fly": [
      "bent-over-dumbbell-reverse-fly"
    ],
    "cable-rear-delt-fly": [
      "cable-rear-delt-fly"
    ],
    "rope-face-pull": [
      "rope-face-pull"
    ],
    "seated-cable-face-pull": [
      "seated-cable-face-pull"
    ],
    "one-arm-dumbbell-row": [
      "one-arm-dumbbell-row"
    ],
    "neutral-grip-lat-pulldown": [
      "neutral-grip-lat-pulldown"
    ],
    "lying-cable-pullover": [
      "lying-cable-pullover"
    ],
    "dumbbell-pullover": [
      "dumbbell-pullover"
    ],
    "standing-dumbbell-curl": [
      "standing-dumbbell-curl"
    ],
    "dumbbell-overhead-triceps-extension": [
      "dumbbell-overhead-triceps-extension"
    ],
    "close-grip-machine-chest-press": [
      "close-grip-machine-chest-press"
    ],
    "dumbbell-front-raise": [
      "dumbbell-front-raise"
    ],
    "cable-front-raise": [
      "cable-front-raise"
    ],
    "dumbbell-romanian-deadlift": [
      "dumbbell-romanian-deadlift"
    ],
    "cable-pull-through": [
      "cable-pull-through"
    ],
    "goblet-squat": [
      "goblet-squat"
    ],
    "smith-machine-squat": [
      "smith-machine-squat"
    ],
    "single-leg-extension": [
      "single-leg-extension"
    ],
    "cable-leg-extension": [
      "cable-leg-extension"
    ],
    "lying-leg-curl": [
      "lying-leg-curl"
    ],
    "standing-leg-curl": [
      "standing-leg-curl"
    ],
    "standing-dumbbell-calf-raise": [
      "standing-dumbbell-calf-raise"
    ],
    "seated-calf-raise": [
      "seated-calf-raise"
    ],
    "decline-crunch": [
      "decline-crunch"
    ],
    "tall-kneeling-pallof-press": [
      "tall-kneeling-pallof-press"
    ],
    "half-kneeling-pallof-press": [
      "half-kneeling-pallof-press"
    ],
    "machine-seated-row": [
      "machine-seated-row"
    ]
  }
};
  Object.values(data.assets).forEach(Object.freeze);
  Object.values(data.exercises).forEach(Object.freeze);
  Object.freeze(data.assets);Object.freeze(data.exercises);
  globalThis.ForgeDemoData=Object.freeze(data);
})();
