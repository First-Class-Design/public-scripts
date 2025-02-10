// Controls Read Timer 
function get_text(el) {
    ret = "";
    var length = el.childNodes.length;
    for(var i = 0; i < length; i++) {
        var node = el.childNodes[i];
        if(node.nodeType != 8) {
            ret += node.nodeType != 1 ? node.nodeValue : get_text(node);
        }
    }
    return ret;
}
    
var words = get_text(document.querySelector('.page_rt')); // Change to the class of the designated content area.
var count = words.split(' ').length;

document.querySelector('.readTimerSpan').innerHTML = Math.round(count / 200).toFixed(); // Change to the class of the output HTML element.