

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

function color_two(isDark=false,dark='hsl(0,0%,0%)', light='hsl(0,0%,100%)'){
    return (isDark ? dark : light);
}
function color_picker(x,y,matrix,isDark) {
    if(x == -1) y == 1 ?  $('.qrCoder__color_dark').val() : $('.qrCoder__color_light').val();
    const color = isDark ? $('.qrCoder__color_dark').val() : $('.qrCoder__color_light').val();
    return color;
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
        .attr('points', '50,0 6.7,75 93.3,75')
        .attr('fill-opacity', '1');
    tri.node().classList.add((isDark?'qr_code__module--dark':'qr_code__module--light'));
    return tri;
}
function symbol_diamond(x,y,matrix,isDark){
    const tri = d3.create('svg:polygon')
        .attr('points', '50,0 10,50 50,100 90,50')
        .attr('fill-opacity', '1');
    tri.node().classList.add((isDark?'qr_code__module--dark':'qr_code__module--light'));
    return tri;
}

function fillWithSameSymbol(moduleSize,svg,matrix,symbolfunction,colorFunction){
    const background = d3.create('svg:rect')
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('fill' , '#00ff00')
        .attr('fill', colorFunction(-1,0,[],false));
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

function makeCode(text, moduleSize=5, moduleType='picker'){
    const code = qrcode(0,'H')
    code.addData(text);
    code.make();
    const moduleCount = code.getModuleCount();
    
    const svg = d3.create("svg:svg")
    .attr('height',moduleCount*moduleSize)
    .attr('width',moduleCount*moduleSize);
    svg.node().classList.add('qr_code');
    
    const codeMatrix = qrcodeToMatrix(code);
    switch (moduleType) {
        case 'picker':
            fillWithSameSymbol(moduleSize,svg,codeMatrix,symbol_rectangle,color_picker);
            break;
        default:
            fillWithSameSymbol(moduleSize,svg,codeMatrix,symbol_rectangle,(x,y,matrix,isDark)=>color_two(isDark));
            break;
    }
    return svg.node();
}

function generateCodeHandler(event){
    const code = makeCode($('.qrCoder__text').val());
    $('.qrCoder__outputs').children().remove() 
    $('.qrCoder__outputs').append(code);
}
function lightColorPickerHandler(event){
    $('.qr_code__module--light').attr('fill',event.target.value);
}
function darkColorPickerHandler(event){
    $('.qr_code__module--dark').attr('fill',event.target.value);
}

$('.qrCoder__submit')[0].addEventListener('click',generateCodeHandler);
$('.qrCoder__color_light')[0].addEventListener('change',lightColorPickerHandler);
$('.qrCoder__color_light')[0].addEventListener('input',lightColorPickerHandler);
$('.qrCoder__color_dark')[0].addEventListener('change',darkColorPickerHandler);
$('.qrCoder__color_dark')[0].addEventListener('input',darkColorPickerHandler);

//First placeholder code;
(()=>{
    const params = new URLSearchParams(window.location.search);
    const text = params.get('codeText') ? params.get('codeText') : "https://youtu.be/oHg5SJYRHA0?autoplay=1";
    const code = makeCode(text);
    $('.qrCoder__outputs').append(code);
})();