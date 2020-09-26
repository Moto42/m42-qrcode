

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
    const color = isDark ? $('.qrCoder__color_dark').val() : $('.qrCoder__color_light').val();
    return color;
}

function symbol_rect(x,y,matrix,isDark){
    const r = d3.create('svg:rect')
        .attr('height', '100%')
        .attr('width', '100%');
    r.node().classList.add('qr_code__module');
    r.node().classList.add((isDark?'qr_code__module--dark':'qr_code__module--light'));
    return r;
}

function fillWithSameSymbol(moduleSize,svg,matrix,symbolfunction,colorFunction){
    for(let y in matrix){
        for(let x in matrix){
            const symbol = symbolfunction(x,y,matrix,matrix[y][x])
                .attr('height', moduleSize)
                .attr('width', moduleSize)
                .attr('x', x*moduleSize)
                .attr('y', y*moduleSize);
            const color = colorFunction(x,y,matrix,matrix[y][x]);
            symbol.attr('fill', color);
            svg.append(()=>symbol.node());
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
            fillWithSameSymbol(moduleSize,svg,codeMatrix,symbol_rect,color_picker);
            break;
        default:
            fillWithSameSymbol(moduleSize,svg,codeMatrix,symbol_rect,(x,y,matrix,isDark)=>color_two(isDark));
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