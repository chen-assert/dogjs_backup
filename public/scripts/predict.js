    var model;
    var labels = ["n02085620 chihuahua",
        "n02085782 japanese spaniel",
        "n02085936 maltese dog",
        "n02086079 pekinese",
        "n02086240 shih tzu",
        "n02086646 blenheim spaniel",
        "n02086910 papillon",
        "n02087046 toy terrier",
        "n02087394 rhodesian ridgeback",
        "n02088094 afghan hound",
        "n02088238 basset",
        "n02088364 beagle",
        "n02088466 bloodhound",
        "n02088632 bluetick",
        "n02089078 black and tan coonhound",
        "n02089867 walker hound",
        "n02089973 english foxhound",
        "n02090379 redbone",
        "n02090622 borzoi",
        "n02090721 irish wolfhound",
        "n02091032 italian greyhound",
        "n02091134 whippet",
        "n02091244 ibizan hound",
        "n02091467 norwegian elkhound",
        "n02091635 otterhound",
        "n02091831 saluki",
        "n02092002 scottish deerhound",
        "n02092339 weimaraner",
        "n02093256 staffordshire bullterrier",
        "n02093428 american staffordshire terrier",
        "n02093647 bedlington terrier",
        "n02093754 border terrier",
        "n02093859 kerry blue terrier",
        "n02093991 irish terrier",
        "n02094114 norfolk terrier",
        "n02094258 norwich terrier",
        "n02094433 yorkshire terrier",
        "n02095314 wire haired fox terrier",
        "n02095570 lakeland terrier",
        "n02095889 sealyham terrier",
        "n02096051 airedale",
        "n02096177 cairn",
        "n02096294 australian terrier",
        "n02096437 dandie dinmont",
        "n02096585 boston bull",
        "n02097047 miniature schnauzer",
        "n02097130 giant schnauzer",
        "n02097209 standard schnauzer",
        "n02097298 scotch terrier",
        "n02097474 tibetan terrier",
        "n02097658 silky terrier",
        "n02098105 soft coated wheaten terrier",
        "n02098286 west highland white terrier",
        "n02098413 lhasa",
        "n02099267 flat coated retriever",
        "n02099429 curly coated retriever",
        "n02099601 golden retriever",
        "n02099712 labrador retriever",
        "n02099849 chesapeake bay retriever",
        "n02100236 german short haired pointer",
        "n02100583 vizsla",
        "n02100735 english setter",
        "n02100877 irish setter",
        "n02101006 gordon setter",
        "n02101388 brittany spaniel",
        "n02101556 clumber",
        "n02102040 english springer",
        "n02102177 welsh springer spaniel",
        "n02102318 cocker spaniel",
        "n02102480 sussex spaniel",
        "n02102973 irish water spaniel",
        "n02104029 kuvasz",
        "n02104365 schipperke",
        "n02105056 groenendael",
        "n02105162 malinois",
        "n02105251 briard",
        "n02105412 kelpie",
        "n02105505 komondor",
        "n02105641 old english sheepdog",
        "n02105855 shetland sheepdog",
        "n02106030 collie",
        "n02106166 border collie",
        "n02106382 bouvier des flandres",
        "n02106550 rottweiler",
        "n02106662 german shepherd",
        "n02107142 doberman",
        "n02107312 miniature pinscher",
        "n02107574 greater swiss mountain dog",
        "n02107683 bernese mountain dog",
        "n02107908 appenzeller",
        "n02108000 entlebucher",
        "n02108089 boxer",
        "n02108422 bull mastiff",
        "n02108551 tibetan mastiff",
        "n02108915 french bulldog",
        "n02109047 great dane",
        "n02109525 saint bernard",
        "n02109961 eskimo dog",
        "n02110063 malamute",
        "n02110185 siberian husky",
        "n02110627 affenpinscher",
        "n02110806 basenji",
        "n02110958 pug",
        "n02111129 leonberg",
        "n02111277 newfoundland",
        "n02111500 great pyrenees",
        "n02111889 samoyed",
        "n02112018 pomeranian",
        "n02112137 chow",
        "n02112350 keeshond",
        "n02112706 brabancon griffon",
        "n02113023 pembroke",
        "n02113186 cardigan",
        "n02113624 toy poodle",
        "n02113712 miniature poodle",
        "n02113799 standard poodle",
        "n02113978 mexican hairless",
        "n02115641 dingo",
        "n02115913 dhole",
        "n02116738 african hunting dog"];

    //image to tensor
    function itt0(img) {
        const image = tf.fromPixels(img).toFloat()
        const resized = tf.image.resizeBilinear(image, [224, 224])
        const offset = tf.scalar(255 / 2)
        const normalized = resized.sub(offset).div(offset)
        const input = normalized.expandDims(0)
        return input;
    }

    pred = (id) => {
        const img = document.getElementById(id);
        const prediction = model.predict({Placeholder: itt0(img)});
        index = prediction.argMax(1).dataSync()[0];
        console.log(index);
        console.log(labels[index]);
        $('#result').html(labels[index]);
    }

    //async function init(){
    const init = (type) => {
        model = tf.loadFrozenModel("static/models/stanford/tensorflowjs_model.pb", "static/models/stanford/weights_manifest.json");
        model.then(res => {
            $('#result').html("正在识别...");
            console.log("model loaded");
            console.log(res);
            model = res;
            if (type != 'cam'){
            pred('golden');
            }
            /*
            pred('husky');
            pred('peking');
            pred('shiba');
            pred('poddle');
            */
            })
      }
