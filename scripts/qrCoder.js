

function qrcodeToMatrix(code) {
    const width = code.getModuleCount();
    const output = [];
    for(let i = 0; i < width; i++){ output.push([]) }

    for(let y = 0; y < width; y++){
        for(let x = 0; x < width; x++){
            output[y][x] = code.isDark(y,x);
        }
    }
    return output;
}
function rangeClamp(number, min, max) {
    if(number < min) return min;
    if(number > max) return max;
    return number;
}

function randomEmoji(){
    // limiting emoji to an inoffensive libary
    const library = [
        '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌',
        '😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓',
        '😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫',
        '😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨',
        '😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯',
        '😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧',
        '😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️',
        '👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🧠',
        '👶','👦','👧','👱','👨','🧔','👨‍🦰','👨‍🦱','👨‍🦳','👨‍🦲','👩','👩‍🦰','🧑‍','👩‍🦱',
        '👩‍🦳','👩‍🦲','🧑‍','👱‍♀️','👱‍♂️','🧓','👴','👵','👨‍⚕️','👩‍⚕️','👩‍🎓','👨‍🏫','👩‍🏫','👨‍⚖️',
        '👩‍⚖️','👨‍🌾','👩‍🌾','👨‍🍳','👩‍🍳','👨‍🔧','👩‍🔧','👨‍🏭','👩‍🏭','👨‍💼','👩‍💼','👨‍🔬','👩‍🔬','👩‍💻',
        '👨‍🎤','👩‍🎤','👨‍🎨','👩‍🎨','👨‍✈️','👩‍✈️','👨‍🚀','👩‍🚀','👨‍🚒','👩‍🚒','👮','👮‍♂️','👮‍♀️','🕵','🕵️‍♂️',
        '🕵️‍♀️','💂','💂‍♂️','💂‍♀️','👷','👷‍♂️','👷‍♀️','🤴','👸','👳','👳‍♂️','👳‍♀️','👲','🧕','🤵',
        '👰','🤰','🤱','👼','🎅','🤶','🦸','🦸‍♂️','🦸‍♀️','🦹','🦹‍♂️','🦹‍♀️','🧙','🧙‍♂️','🧙‍♀️',
        '🧚','🧚‍♂️','🧚‍♀️','🧛','🧛‍♂️','🧛‍♀️','🧜','🧜‍♂️','🧜‍♀️','🧝','🧝‍♂️','🧝‍♀️','🧞','🧞‍♂️','🧞‍♀️',
        '🧟','🧟‍♂️','🧟‍♀️','💆','💆‍♂️','💆‍♀️','💇','💇‍♂️','💇‍♀️','🚶','🚶‍♂️','🚶‍♀️','🧍','🧍‍♂️','🧍‍♀️','🧎',
        '🧎‍♂️','🧎‍♀️','👨‍🦯','👩‍🦯','👨‍🦽','👩‍🦽','🏃','🏃‍♂️','🏃‍♀️','💃','🕺','🕴','🧖','🧖‍♂️','🧖‍♀️','🧘',
        '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸',
        '🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇',
        '🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷','🕸','🦂',
        '🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳',
        '🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘',
        '🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈',
        '🐓','🦃','🦚','🦜','🦢','🦩','🕊','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀',
        '🐿','🦔','🐉','🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🍒','🍑',
        '🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶','🌽','🥕','🧄','🧅',
        '🥔','🍠','🥐','🥯','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩',
        '🍗','🍖','🦴','🌭','🍔','🍟','🍕','🥪','🥙','🧆','🌮','🌯','🥗','🥘','🥫',
        '🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮',
        '🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩',
        '🍪','🌰','🥜','🍯','🥛','☕️','🍵','🧃','🥤','🍶','🍺','🍻','🥂','🍷','🥃',
        '🍸','🍹','🧉','🍾','🧊','🥄','🍴','🍽','🥣','🥡','🧂',
    ];
    const rand = Math.floor(Math.random()*library.length);
    return library[rand];
}

function addNoiseToColor(color,noiseLevel){
    const hsl = d3.hsl(color);
    
    if(Number.isNaN(hsl.h)) hsl.h = 1;
    const hRange = 45*noiseLevel;
    hsl.h = Math.abs(hsl.h+((Math.random()*(hRange*2))-hRange))%360;

    if(Number.isNaN(hsl.s)) hsl.s = 0;
    const sRange = .9*noiseLevel;
    const sChange = (Math.random()*sRange)-sRange*.5;
    const newS = hsl.s+sChange;
    hsl.s = rangeClamp(newS,0,1);

    if(Number.isNaN(hsl.l)) hsl.l = 0;
    const lRange = .9*noiseLevel;
    const lChange = (Math.random()*lRange)-lRange*.5;
    const newL = hsl.l+lChange;
    hsl.l = rangeClamp(newL,0,1);

    return hsl.hex();
}

function color_two(isDark=false,dark='hsl(0,0%,0%)', light='hsl(0,0%,100%)'){
    return (isDark ? dark : light);
}
function color_picker(x,y,matrix,isDark) {
    if(x == -1) {
        color =  isDark ?  $('#qrCoder__inputs__color_dark').val() : $('#qrCoder__inputs__color_light').val();
        return color;
    }
    if(isDark){
        const chosenColor =  $('#qrCoder__inputs__color_dark').val();
        const noiseLevel = $('#qrCoder__inputs__color_dark__noise').val()/1000;
        const noisycolor = addNoiseToColor(chosenColor, noiseLevel);
        return noisycolor;
    }
    else return $('#qrCoder__inputs__color_light').val();
    return 'white'; //this line should never execute.
}

function symbol_rectangle(x,y,matrix,isDark){
    const r = d3.create('svg:rect')
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('fill-opacity', '1');
    r.node().classList.add((isDark?'qr_code__module--dark':'qr_code__module--light'));
    return r;
}
function symbol_triangle(x,y,matrix,isDark){
    const tri = d3.create('svg:polygon')
        .attr('points', '50,0 6.7,100 93.3,100')
        .attr('fill-opacity', '1');
    tri.node().classList.add((isDark?'qr_code__module--dark':'qr_code__module--light'));
    return tri;
}
function symbol_diamond(x,y,matrix,isDark){
    const tri = d3.create('svg:polygon')
        .attr('points', '50,0 0,50 50,100 100,50')
        .attr('fill-opacity', '1');
    tri.node().classList.add((isDark?'qr_code__module--dark':'qr_code__module--light'));
    return tri;
}
function symbol_emoji(x,y,matrix,isDark){
    const emo = d3.create('svg:text')
        .attr('x',"-8")
        .attr('y',"80")
        .attr('font-size',"85")
        .text(randomEmoji());
    return emo;   
}

function fillWithSameSymbol(moduleSize,svg,matrix,symbolfunction,colorFunction){
    const background = d3.create('svg:rect')
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('fill' , '#00ff00')
        // .attr('fill', 'white');
        .attr('fill', colorFunction(-1,0,matrix,false));
    background.node().classList.add('qr_code__module--light');
    svg.append(()=>background.node());
    
    for(let y in matrix){
        for(let x in matrix){
            const moddy = d3.create('svg:svg')
            .attr('height', moduleSize)
            .attr('width', moduleSize)
            .attr('x', x*moduleSize)
            .attr('y', y*moduleSize)
            .attr( 'viewBox', '0 0 100 100')
            .attr('fill-opacity', '0');
            moddy.node().classList.add('qr_code__module');
            
            if(matrix[y][x]){
                const symbol = symbolfunction(x,y,matrix,matrix[y][x])
                const color = colorFunction(x,y,matrix,matrix[y][x]);
                symbol.attr('fill', color);
                moddy.append(()=>symbol.node());
            }
            
            svg.append(()=>moddy.node());
        }
    }
}

function makeCode(text, moduleSize=5){
    const code = qrcode(0,'H')
    code.addData(text);
    code.make();
    const moduleCount = code.getModuleCount();
    
    const svg = d3.create("svg:svg")
    .attr('height',moduleCount*moduleSize)
    .attr('width',moduleCount*moduleSize);
    svg.node().classList.add('qr_code');
    
    const codeMatrix = qrcodeToMatrix(code);

    const symbolSelection = $('input[name="qrCoder__inputs__module_shape"]:checked').val();
    let symbolFunction;
    switch(symbolSelection) {
        case 'rectangle':
            symbolFunction = symbol_rectangle;
            break;
        case 'triangle':
            symbolFunction = symbol_triangle;
            break;
        case 'diamond':
            symbolFunction = symbol_diamond;
            break;
        case 'emoji':
            symbolFunction = symbol_emoji;
            break;
        default:
            symbolFunction = symbol_rectangle;
            break;
    }
    fillWithSameSymbol(moduleSize,svg,codeMatrix,symbolFunction,color_picker);
    return svg.node();
}

function generatePlaceholderCode(){
    const moduleSize = $('#qrCoder__inputs__module_size').val();
    const code = makeCode("https://youtu.be/oHg5SJYRHA0?autoplay=1", moduleSize);
    return code;
}

function generateCodeHandler(event){
    const text = $('#qrCoder__inputs__text').val()
    const moduleSize = $('#qrCoder__inputs__module_size').val();
    const code = makeCode(text,moduleSize);
    $('#qrCoder__code_container').children().remove() 
    $('#qrCoder__code_container').append(code);
}
function downloadSVGHandler(event){
    // TODO: this is a stub
    // Better yet: Can we make the svg right-clickable?
}
//Set up event listeners
(()=>{
    $('#qrCoder__inputs__generate').click(generateCodeHandler);
    $('#qrCoder__inputs__text').on('input', generateCodeHandler);
    $('#qrCoder__inputs__color_dark').change(generateCodeHandler);
    $('#qrCoder__inputs__color_light').change(generateCodeHandler);
    $('#qrCoder__inputs__color_dark__noise').on('input', generateCodeHandler);
    $('#qrCoder__inputs__module_size').on('input', generateCodeHandler);

    $('.qrCoder__inputs__module_shape').click(generateCodeHandler);

    $('qrCoder__downlads__svg').on('click',downloadSVGHandler);
})();

//First placeholder code;
(()=>{
    const params = new URLSearchParams(window.location.search);
    const text = params.get('codeText') ? params.get('codeText') : "https://youtu.be/oHg5SJYRHA0?autoplay=1";
    $('#qrCoder__inputs__text').val(text);
    generateCodeHandler();
})();