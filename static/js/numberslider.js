/* 
	@author zz85
	balloon toolbars and value sliders for numbers
	idea motivated by http://vimeo.com/36579366
*/



var div = document.createElement('div');

function createElementOfId(id) {
	var e = div.cloneNode(false);
	e.id = id;
	return e;
}

var bubble = createElementOfId('bubble');
var vtrack = createElementOfId('vtrack');
var track = createElementOfId('track');
var bubble = createElementOfId('bubble');
var lslider = createElementOfId('lslider');
var rslider = createElementOfId('rslider');

lslider.className = 'slider';
rslider.className = 'slider';
vtrack.appendChild(lslider);
vtrack.appendChild(rslider);
vtrack.appendChild(track);
bubble.appendChild(vtrack);

document.body.appendChild(bubble);

/*
The above creates something like
<div id="bubble" class="bubble">
  <div id="vtrack" class="vtrack">
    <div id="lslider" class="lslider"></div>
    <div id="rslider" class="rslider"></div>
    <div id="track" class="track"></div>
  </div>
</div>
*/

var trackWidth = parseInt(track.clientWidth, 0);
var halfWidth = trackWidth/2;

var target;
var current;
var isFloat;
var token;
var startPos;
var endPos;

function onMouseMove(e) {

  
  var x = e.clientX; // this might come in useful later for out of bubble drags
  var y = e.clientY;
  
  var offsetX = (e.offsetX!==undefined) ? e.offsetX : e.layerX;
  var offsetY = (e.offsetY!==undefined) ? e.offsetY : e.layerY;

  var val = offsetX - halfWidth;
  if (val > 0) {
    rslider.style.width = val + 'px';
    lslider.style.width = 0;
  } else {
    lslider.style.width = -val + 'px';
    rslider.style.width = 0;
  }
  
  var result;
  
  if (isFloat) {
    result = current + val * 0.1;
    result = result.toFixed(1);
  } else {
    result = current + Math.round(val);
  }
  
  //target.innerHTML = result;
  console.log('result', result);

  code.replaceRange(result, startPos, endPos);
  //debug.innerHTML = '(' + offsetX + ',' + offsetY + ')';
  cursorUpdate();
  return false;

}

vtrack.onmousemove = onMouseMove;

// we need to plug into codeMirror

code.setOption("onCursorActivity", cursorUpdate);

function cursorUpdate() {
	
	var cursor = code.getCursor();
	token = code.getTokenAt(cursor);


	if (token.className === "number") {

		current = token.string;
		
		console.log(token);

		startPos = {
			line: cursor.line,
			ch: token.start
		};
		
		endPos = {
			line: cursor.line,
			ch: token.end
		};

		// var startCoords = code.charCoords(startPos);
		// var endCoords = code.charCoords(endPos);
		// var atCoords =  {x: (startCoords.x + endCoords.x)/2, y: startCoords.y };
		
		var atCoords = code.charCoords(cursor);
		

		bubble.style.left = atCoords.x + 'px';
		bubble.style.top = atCoords.y - 5 + 'px';
		//lslider.style.width = 0;
		//rslider.style.width = 0;

		// console.log('token', token, 'startCoords',  current);

		if ( isFloat = current.indexOf('.')>-1 ) {
			current = parseFloat(current);
		} else {
			current = parseInt(current, 0);
		}

	}

}



/*
  function slideHere(e) {
  var x = parseInt(e.style.left,0);
  var y = parseInt(e.style.top,0);
  target = e;
  
  current = target.innerHTML;
  
  if ( isFloat = current.indexOf('.')>-1 ) {
    current = parseFloat(current);
  } else {
    current = parseInt(current, 0);
  }
  //console.log(isFloat, current);
  bubble.style.left = e.style.left; //x+'px';
  bubble.style.top = e.style.top;
  
}


   */