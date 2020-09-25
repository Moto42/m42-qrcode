

function qrcodeToMatrix(code) {
    const width = code.getModuleCount();
}

function makenewcode(event){
    const text = $('.qrCoder__text')[0].value;
    const code = qrcode(0,'M')
    code.addData(text);
    code.make();
    const tag = code.createImgTag(2);
    const output = $('.qrCoder__outputs')
    output.children().remove()
    output.append(tag);
}

$('.qrCoder__submit')[0].addEventListener('click',makenewcode);