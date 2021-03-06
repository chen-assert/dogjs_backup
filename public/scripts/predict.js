    var model;
    var labels = ["n02085620 chihuahua 吉娃娃",
        "n02085782 japanese spaniel",
        "n02085936 maltese dog",
        "n02086079 pekinese 北京犬（京巴）",
        "n02086240 shih tzu 西施犬（狮子犬） ",
        "n02086646 blenheim spaniel",
        "n02086910 papillon",
        "n02087046 toy terrier",
        "n02087394 rhodesian ridgeback",
        "n02088094 afghan hound 阿富汗猎犬",
        "n02088238 basset",
        "n02088364 beagle",
        "n02088466 bloodhound",
        "n02088632 bluetick",
        "n02089078 black and tan coonhound",
        "n02089867 walker hound",
        "n02089973 english foxhound 英国猎狐犬",
        "n02090379 redbone",
        "n02090622 borzoi",
        "n02090721 irish wolfhound",
        "n02091032 italian greyhound",
        "n02091134 whippet",
        "n02091244 ibizan hound 伊比莎猎犬",
        "n02091467 norwegian elkhound",
        "n02091635 otterhound",
        "n02091831 saluki",
        "n02092002 scottish deerhound",
        "n02092339 weimaraner",
        "n02093256 staffordshire bullterrier 斯塔福郡斗牛梗",
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
        "n02097047 miniature schnauzer 迷你雪纳瑞",
        "n02097130 giant schnauzer 大雪纳瑞",
        "n02097209 standard schnauzer 标准雪纳瑞",
        "n02097298 scotch terrier",
        "n02097474 tibetan terrier",
        "n02097658 silky terrier",
        "n02098105 soft coated wheaten terrier",
        "n02098286 west highland white terrier",
        "n02098413 lhasa",
        "n02099267 flat coated retriever",
        "n02099429 curly coated retriever",
        "n02099601 golden retriever 金毛寻回犬",
        "n02099712 labrador retriever 拉布拉多寻回犬",
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
        "n02106166 border collie 边境牧羊犬",
        "n02106382 bouvier des flandres",
        "n02106550 rottweiler",
        "n02106662 german shepherd 德国牧羊犬",
        "n02107142 doberman",
        "n02107312 miniature pinscher",
        "n02107574 greater swiss mountain dog",
        "n02107683 bernese mountain dog",
        "n02107908 appenzeller",
        "n02108000 entlebucher",
        "n02108089 boxer",
        "n02108422 bull mastiff",
        "n02108551 tibetan mastiff",
        "n02108915 french bulldog 法国斗牛犬",
        "n02109047 great dane",
        "n02109525 saint bernard",
        "n02109961 eskimo dog",
        "n02110063 malamute 阿拉斯加雪橇犬",
        "n02110185 siberian husky 西伯利亚雪橇犬（哈士奇）",
        "n02110627 affenpinscher",
        "n02110806 basenji",
        "n02110958 pug",
        "n02111129 leonberg",
        "n02111277 newfoundland",
        "n02111500 great pyrenees",
        "n02111889 samoyed 萨摩耶",
        "n02112018 pomeranian",
        "n02112137 chow",
        "n02112350 keeshond",
        "n02112706 brabancon griffon",
        "n02113023 pembroke 彭布罗克威尔士柯基犬",
        "n02113186 cardigan 卡迪根威尔士柯基犬",
        "n02113624 toy poodle 泰迪",
        "n02113712 miniature poodle 迷你贵宾犬",
        "n02113799 standard poodle 贵宾犬",
        "n02113978 mexican hairless",
        "n02115641 dingo",
        "n02115913 dhole",
        "n02116738 african hunting dog"];
    
    Array.prototype.max = function() {
        return Math.max.apply(null, this);
        };
        
    Array.prototype.min = function() {
        return Math.min.apply(null, this);
        };

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
        doPred(img);
    }

    doPred = (img) =>{
        const prediction = model.predict({Placeholder: itt0(img)});
        var results = "";
        var indexs = [];
        var maxIndex = 0;
        var max = 0;
        prediction.dataSync().forEach(function(e,i){
            if (e>=0.5){
                results = results + labels[i] + "; ";
                indexs.push({e,i});
            }
            if (e>max){
                max = e;
                maxIndex = i;
            }
        });
        if (indexs.length == 0){
                indexs.push({max,maxIndex});
                if(max<0.07){
                    results = results + "您输入的图片可能不包含狗。如果包含，它可能是： "
                }
                results = results + labels[maxIndex] + "; ";
        }
        console.log(indexs);
        $('#result').html(results);
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
