
/** runs callback for each module in qr code.
 * callback is given (x,y,isDark);
 */
function codeForEach(code, callback) {
    const limit = code.getModuleCount();
    for(let y=0; y<limit; y++){
        for(let x=0; x<limit; x++){
            const isDark = code.isDark(y,x);
            callback(x,y,isDark,code);
        }
    }
} 

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

function getValue(str,remove=null){
    const value = str.match(/\(([^)]+)\)/)[1];
    return remove ? value.replace(remove,'') : value;
}

function svgToDataUri(svg){
    svg = svg.cloneNode(true);
    svg.removeAttribute('class');
    svg.querySelectorAll('*').forEach(n =>{
        n.removeAttribute('class');
        if(n.hasAttribute('fill') && n.hasAttribute('style')) {
            const color = d3.hsl(n.getAttribute('fill'));
            const filters = n.style.filter.split(' ');
            for(let filter of filters){
                if(/^hue-rotate/.test(filter)){
                    color.h = (Number(color.h) + Number(getValue(filter,'deg'))).toFixed(1);
                }
                if(/^saturate/.test(filter)){
                    color.s = Number((Number(color.s) * (Number(getValue(filter,'%'))/100)).toFixed(2));
                }
                if(/^brightness/.test(filter)){
                    color.l = Number((Number(color.l) * (Number(getValue(filter,'%'))/100)).toFixed(2));
                }
            }
            n.setAttribute('fill', color.hex());
            n.removeAttribute('style');
        }
    });
    let source = new XMLSerializer().serializeToString(svg);
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    return url;
}

function download(filename, uri) {
    var element = document.createElement('a');
    element.setAttribute('href', uri);
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
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

function plusminus(num,noiseLevel=1){
    return ((num*2*Math.random())-num)*noiseLevel;
}

//todo filter out 'do nothing' filters
function addNoiseToSymbol(symbol, noiseLevel){
    const sat = 100 + plusminus(75,noiseLevel);
    const lit = 100 + plusminus(75,noiseLevel);
    const hue = plusminus(90,noiseLevel);
    const style = [];
    if(hue !=   0) style.push(`hue-rotate(${hue}deg)`);
    if(sat != 100) style.push(`saturate(${sat}%)`);
    if(lit != 100) style.push(`brightness(${lit}%)`);
    if(style.length > 0) symbol.style('filter',style.join(' '));
}

function color_two(isDark=false,dark='hsl(0,0%,0%)', light='hsl(0,0%,100%)'){
    return (isDark ? dark : light);
}
function color_picker(x,y,isDark) {
    if(x == -1) {
        color =  isDark ?  $('#qrCoder__inputs__color_dark').val() : $('#qrCoder__inputs__color_light').val();
        return color;
    }
    if(isDark){
        const chosenColor =  $('#qrCoder__inputs__color_dark').val();
        return chosenColor;
    }
    else return $('#qrCoder__inputs__color_light').val();
    return 'white'; //this line should never execute.
}

function symbol_rectangle(x,y,isDark,moduleSize){
    x *= moduleSize;
    y *= moduleSize;
    const r = d3.create('svg:rect')
        .attr('height', moduleSize)
        .attr('width', moduleSize)
        .attr('x', x)
        .attr('y', y);
    const colorClass = isDark?'qr_code__module--dark':'qr_code__module--light';
    r.classed(colorClass, true);
    return r;
}
function symbol_triangle(x,y,isDark,moduleSize){
    x *= moduleSize;
    y *= moduleSize;
    const tx = x+(moduleSize*.5);
    const ty = y+(moduleSize*0);
    const rx = x+(moduleSize*.067);
    const ry = y+(moduleSize*1);
    const lx = x+(moduleSize*.933);
    const ly = y+(moduleSize*1);
    const points = `${tx},${ty} ${rx},${ry} ${lx},${ly}`
    const tri = d3.create('svg:polygon')
        .attr('points', points)
        .attr('fill-opacity', '1');
    const colorClass = isDark?'qr_code__module--dark':'qr_code__module--light';
    tri.classed(colorClass, true);
    return tri;
}
function symbol_diamond(x,y,isDark,moduleSize){
    
    x *= moduleSize;
    y *= moduleSize;
    const tx = x+(moduleSize*.5);
    const ty = y+(moduleSize*0);
    const rx = x+(moduleSize*0);
    const ry = y+(moduleSize*.5);
    const bx = x+(moduleSize*.5);
    const by = y+(moduleSize*1);
    const lx = x+(moduleSize*1);
    const ly = y+(moduleSize*.5);
    const points = `${tx},${ty} ${rx},${ry} ${bx},${by} ${lx},${ly}`;
    const dia = d3.create('svg:polygon')
        .attr('points', points)
        .attr('fill-opacity', '1');
    const colorClass = isDark?'qr_code__module--dark':'qr_code__module--light';
    dia.classed(colorClass, true);
    return dia;
}
function symbol_emoji(x,y,isDark){
    const emo = d3.create('svg:text')
        .attr('x',"-8")
        .attr('y',"80")
        .attr('font-size',"85")
        .text(randomEmoji());
    return emo;   
}

const makeModule = (x,y,moduleSize) => {
    const moddy = d3.create('svg:svg')
        .attr('height', moduleSize)
        .attr('width', moduleSize)
        .attr('x', x*moduleSize)
        .attr('y', y*moduleSize)
        .attr( 'viewBox', '0 0 100 100');
        moddy.node().classList.add('qr_code__module');
    return moddy;
}
function fillWithSameSymbol(moduleSize,svg,code,symbolfunction,colorFunction){
    
    const noiseLevel = $('#qrCoder__inputs__color_dark__noise').val()/1000;
    const background = d3.create('svg:rect')
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('fill' , '#00ff00')
        .attr('fill', colorFunction(-1,0,false));
        background.node().classList.add('qr_code__module--light');
    svg.append(()=>background.node());
    
    codeForEach(code,(x,y,isDark)=>{
        if(isDark){
            const symbol = symbolfunction(x,y,isDark,moduleSize);
            symbol.classed('qr_code__module', true);
            const color = colorFunction(x,y,isDark);
            symbol.attr('fill', color);
            addNoiseToSymbol(symbol,noiseLevel);
            svg.append(()=>symbol.node());
        }
        
    });
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
    fillWithSameSymbol(moduleSize,svg,code,symbolFunction,color_picker);
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
    const svgNode = d3.select('.qr_code').node();
    const uri = svgToDataUri(svgNode);
    download('qrCode.svg', uri);
}
function darkColorHandler(event){
    $('.qr_code__module--dark').css('fill', event.target.value);
}
function lightColorHandler(event){
    $('.qr_code__module--light').css('fill', event.target.value);
}

//Set up event listeners
(()=>{
    $('#qrCoder__inputs__generate').click(generateCodeHandler);
    $('#qrCoder__inputs__text').on('input', generateCodeHandler);
    $('#qrCoder__inputs__color_dark').change(generateCodeHandler);
    $('#qrCoder__inputs__color_dark').on('input',darkColorHandler);
    $('#qrCoder__inputs__color_light').change(generateCodeHandler);
    $('#qrCoder__inputs__color_light').on('input',lightColorHandler);
    $('#qrCoder__inputs__color_dark__noise').on('input', generateCodeHandler);
    $('#qrCoder__inputs__module_size').on('input', generateCodeHandler);

    $('.qrCoder__inputs__module_shape').click(generateCodeHandler);

    $('#qrCoder__downloads__svg').on('click',downloadSVGHandler);
})();

//First placeholder code;
(()=>{
    const params = new URLSearchParams(window.location.search);
    const text = params.get('codeText') ? params.get('codeText') : "https://youtu.be/oHg5SJYRHA0?autoplay=1";
    $('#qrCoder__inputs__text').val(text);
    generateCodeHandler();
})();