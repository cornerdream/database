/*
The MIT License

Copyright (c) 2011 Matthew Wilcoxson (www.akademy.co.uk)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/*
CanvasZoom
By Matthew Wilcoxson

Description:    Zooming of very large images with Javascript, HTML5 and the canvas element (based on DeepZoom format).
Website:        http://www.akademy.co.uk/software/canvaszoom/canvaszoom.php
Version:        1.0

global ImageLoader, window  (for JSLint) 
*/
import {ImageLoader} from './imageloader'
function CanvasZoom2( canvas, tilesFolder, imageWidth, imageHeight,size,min,max,eventBus,s)
{
	// var _event = eventBus;
	//var t = this; // make "this" accessible when out of "this" scope and minify
	
	//var _tileOverlap = 1; // assumed
	var _tileSize = s; // assumed
	
	var _debug = false;
	var _debugShowRectangle = false; // Paint a rectangle rather than an image
	
	// var _zoomLevelMin = 0;
	// var _zoomLevelMax = 0;
	var _zoomLevelMin = min;
	var _zoomLevelMax = max;
	//var _zoomLevelFull = -1; // For painting a background image for all missing tiles. Needs improvement though.
	//var _zoomLevel = -1;
	var _zoomLevelFull = size; // For painting a background image for all missing tiles. Needs improvement though.
	var _zoomLevel = size;

	var _mouseX = 0;
	var _mouseY = 0;
	var _mouseDownX = 0;
	var _mouseDownY = 0;
	var _mouseMoveX = 0;
	var _mouseMoveY = 0;

	var _mouseIsDown = false;
	var _mouseLeftWhileDown = false;

	var _offsetX = 0;
	var _offsetY = 0;

	var _aGetWidth = 'w';
	var _aGetHeight = 'h';
	var _aGetTile = 't';
	var _aGetWaiting = 'wt';
	
	var _tileZoomArray = null;
	var _imageLoader = null;

	var _ctx = null;

	var getTileFile, getEvent, 
		zoom, zoomIn, zoomOut,
		// mousePosX, mousePosY, 
			mouseUp, mouseMove, mouseUpWindow, mouseMoveWindow,
			mouseDown, mouseOut, mouseOver,mouseWheel,
		initialTilesLoaded, calculateNeededTiles, getTiles, tileLoaded,
		paint;
            
	getTileFile = function( zoom, column, row ) {
		return tilesFolder + "/" + zoom + "/" + column + "_" + row + ".jpg";
	};

	initialTilesLoaded = function() {
		
		var tileZoomLevel = _tileZoomArray[_zoomLevel];
		console.log(tileZoomLevel)
		var columns = tileZoomLevel.length;
		var rows = tileZoomLevel[0].length;
 
		var iColumn = 0, iRow = 0;
		var imageId = 0;
		for( iColumn = 0; iColumn < columns; iColumn++ )
		{
			for( iRow = 0; iRow < rows; iRow++ )
			{
				tileZoomLevel[iColumn][iRow][_aGetTile] = _imageLoader.getImageById( imageId++ );
			}
		}
		console.log(tileZoomLevel)
		_tileZoomArray[_zoomLevelFull][0][0][_aGetTile] = _imageLoader.getImageById( imageId );
		console.log(_tileZoomArray)
		//
		// Centre image
		//
		console.log(canvas.width,tileZoomLevel[_aGetWidth])
		console.log(canvas.height,tileZoomLevel[_aGetHeight])
		console.log(_offsetX,_offsetY)
		_offsetX = (canvas.width - tileZoomLevel[_aGetWidth]) / 2;
		_offsetY = (canvas.height - tileZoomLevel[_aGetHeight]) / 2;
		console.log(_offsetX,_offsetY)
		// 
		// Add mouse listener events
		//
        var mouse = 'mouse'; // minify!
		canvas.addEventListener( mouse+'move', function (e) { mouseMove( getEvent(e) ); }, true);
		canvas.addEventListener(mouse+'down', function (e) { mouseDown( getEvent(e) ); }, true);
		canvas.addEventListener(mouse+'up', function (e) { mouseUp( getEvent(e) ); }, true);
		
		canvas.addEventListener(mouse+'out', function (e) { mouseOut( getEvent(e) ); }, true);
		canvas.addEventListener(mouse+'over', function (e) { mouseOver( getEvent(e) ); }, true);
		canvas.addEventListener('DOMMouseScroll', function (e) { mouseWheel( getEvent(e) ); }, true);
		canvas.addEventListener(mouse+'wheel', function (e) { mouseWheel( getEvent(e) ); }, true);
		
		// Keep track even if mouse is outside of canvas while dragging image
		window.addEventListener(mouse+'up', function (e) { mouseUpWindow( getEvent(e) ); }, false);
		window.addEventListener(mouse+'move', function (e) { mouseMoveWindow( getEvent(e) ); }, false);
		
		_ctx = canvas.getContext('2d');
		
		paint();
	};
    
	// Helper function
	getEvent = function( event ) {
		if( !event ) // IE
		{   event = window.event;   }
		
		return event;
	};
    
	mouseDown = function( event ) {
		_mouseIsDown = true;
		_mouseLeftWhileDown = false;
		
		// _mouseDownX = mousePosX(event);
		// _mouseDownY = mousePosY(event); 
		console.log(windowToCanvas(event.clientX,event.clientY).x,windowToCanvas(event.clientX,event.clientY).y)
		_mouseDownX = windowToCanvas(event.clientX,event.clientY).x;
		_mouseDownY = windowToCanvas(event.clientX,event.clientY).y; 
		
		_mouseMoveX = _mouseDownX;
		_mouseMoveY = _mouseDownY;
	};
	
	mouseUp = function( event ) {
		_mouseIsDown = false;
		_mouseLeftWhileDown = false;
		
		// _mouseX = mousePosX(event);
		// _mouseY = mousePosY(event); 
		console.log(windowToCanvas(event.clientX,event.clientY).x,windowToCanvas(event.clientX,event.clientY).y)
		_mouseX = windowToCanvas(event.clientX,event.clientY).x;
		_mouseY = windowToCanvas(event.clientX,event.clientY).y;
		
		if( _mouseX === _mouseDownX && _mouseY === _mouseDownY )
		{
			// Didn't drag so assume a click.
			zoomIn();
		}
	};
	
	mouseMove = function(event) {
		// _mouseX = mousePosX(event);
		// _mouseY = mousePosY(event); 
		console.log(windowToCanvas(event.clientX,event.clientY).x,windowToCanvas(event.clientX,event.clientY).y)
		_mouseX = windowToCanvas(event.clientX,event.clientY).x;
		_mouseY = windowToCanvas(event.clientX,event.clientY).y; 

		if( _mouseIsDown )
		{
			var newOffsetX = _offsetX + (_mouseX - _mouseMoveX);
			var newOffsetY = _offsetY + (_mouseY - _mouseMoveY);
			console.log(newOffsetX,newOffsetY)
			console.log(_zoomLevel)
			calculateNeededTiles( _zoomLevel, newOffsetX, newOffsetY );
			
			_mouseMoveX = _mouseX;
			_mouseMoveY = _mouseY;
			
			_offsetX = newOffsetX;
			_offsetY = newOffsetY;
			
			paint();
		}
	};
	
    // mousePosX = function( event ) {
	// 	// Get the mouse position relative to the canvas element.
	// 	var x = 0;
		
	// 	if (event.layerX || event.layerX === 0) { // Firefox
	// 		x = event.layerX - canvas.offsetLeft;
	// 		//x = event.layerX
	// 	} else if (event.offsetX || event.offsetX === 0) { // Opera
	// 		// x = event.offsetX;
	// 		x = event.offsetX;
	// 	}
		
	// 	return x;
	// };
	
	// mousePosY = function( event ) {
	// 	var y = 0;
		
	// 	if (event.layerY || event.layerY === 0) { // Firefox
	// 		y = event.layerY - canvas.offsetTop;
	// 		//y = event.layerY
	// 	} else if (event.offsetY || event.offsetY === 0) { // Opera
	// 		// y = event.offsetY;
	// 		y = event.offsetY;
	// 	}
		
	// 	return y;
	// };
    
	mouseOut = function( ) {
		if( _mouseIsDown )
		{
			_mouseLeftWhileDown = true;
		}
	};
	
	mouseOver = function(  ) {
		// (Should be called mouseEnter IMO...)
		_mouseLeftWhileDown = false;
	};

	var wheelNumber = 0;
	var scale=[1,2,4,10,20,40];
	function windowToCanvas(x,y) {
        var box = canvas.getBoundingClientRect();  //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
        console.log(box)
		return {
            x: x - box.left - (box.width - canvas.width) / 2,
            y: y - box.top - (box.height - canvas.height) / 2
        };
    }
	mouseWheel = function( event) {
		
		
		var delta = 0;	
		if (event.wheelDelta) { /* IE/Opera. */
			delta = -(event.wheelDelta/120);
		} else if (event.detail) { /* Mozilla */
			delta = event.detail/3;
		}

		if (delta)  {
			if (delta < 0){	
				if(wheelNumber==scale.length){return}
				wheelNumber++;
				if(wheelNumber>=scale.length){wheelNumber=scale.length}
				var insize = scale[wheelNumber];
				console.log(insize)
				eventBus.$EventBus.$emit('fruits', wheelNumber)
				zoomIn(insize); 
				// zoomIn(40);   
			}else{
				if(wheelNumber==0){return}
				wheelNumber--;
				if(wheelNumber<=0){wheelNumber=0}
				var outsize = scale[wheelNumber];
				console.log(outsize)
				eventBus.$EventBus.$emit('fruits', wheelNumber)	
				zoomOut(outsize);  
			}
		}		 
		if (event.preventDefault){	event.preventDefault(); }		    
		event.returnValue = false;
	};
	
	// If mouseUp occurs outside of canvas while moving, cancel movement.
	mouseUpWindow = function( event ) {
		if( _mouseIsDown && _mouseLeftWhileDown )
		{
			mouseUp( event );
		}
	};
	
	// keep track of mouse outside of canvas so movement continues.
	mouseMoveWindow = function(event) {
		if( _mouseIsDown && _mouseLeftWhileDown )
		{
			mouseMove(event);
		}
	};
    
	// Zoom in a single level
	zoomIn = function (size) {
		// zoom( _zoomLevel + 1 );
		zoom( size);
		paint();
	};
	
	// Zoom out a single level
	zoomOut = function (size) {

		// zoom( _zoomLevel - 1 );
		zoom( size);
		paint();
	};
	
	//Zoom in at the centre of the canvas
	this.zoomInCentre = function (size) {
		
		_mouseX = canvas.width / 2;
		_mouseY = canvas.height / 2;
		// _mouseX = 0;
		// _mouseY = 0;
		console.log(_mouseX,_mouseY)
		zoomIn(size);
	};
	
	//Zoom out at the centre of the canvas
	this.zoomOutCentre = function (size) {
		_mouseX = canvas.width / 2;
		_mouseY = canvas.height / 2;
		// _mouseX = 0;
		// _mouseY = 0;
		console.log(_mouseX,_mouseY)
		zoomOut(size);
	};
	
	// this.zoom = zoom
	// Change the zoom level and update.
	zoom = function(zoomLevel) {
		console.log(zoomLevel,_zoomLevel)
		console.log(_zoomLevelMin,_zoomLevelMax)

		if( zoomLevel >= _zoomLevelMin && zoomLevel <= _zoomLevelMax )
		{
			var newZoom = zoomLevel,
					currentZoom = _zoomLevel;
										
			//
			// Calculate new offset
			//
			var zoomX = _mouseX;
			var zoomY = _mouseY;
			
			// TODO: restrict zoom position to within (close?) area of image.
			console.log(zoomX,zoomY)
			console.log(_offsetX,_offsetY)
			var currentImageX = zoomX - _offsetX,
					currentImageY = zoomY - _offsetY;
			console.log(currentImageX,currentImageY)		
			console.log(_tileZoomArray[newZoom][_aGetWidth],_tileZoomArray[currentZoom][_aGetWidth])
			var scale = _tileZoomArray[newZoom][_aGetWidth] / _tileZoomArray[currentZoom][_aGetWidth];
			console.log(scale)
			var newImageX = currentImageX * scale,
					newImageY = currentImageY * scale;
			console.log(newImageX,currentImageX,_offsetX)
			console.log(newImageY,currentImageY,_offsetY)
			var newOffsetX = _offsetX - (newImageX - currentImageX),
					newOffsetY = _offsetY - (newImageY - currentImageY);
			//var newOffsetX = _offsetX + (_tileZoomArray[newZoom][_aGetWidth]-_tileZoomArray[currentZoom][_aGetWidth]),newOffsetY = _offsetY + (_tileZoomArray[newZoom][_aGetHeight]-_tileZoomArray[currentZoom][_aGetHeight]);
			// var newOffsetX = _mouseX + (newImageX - currentImageX),
			// 		newOffsetY = _mouseY + (newImageY - currentImageY);
		
			console.log(newZoom, newOffsetX, newOffsetY)
			calculateNeededTiles( newZoom, newOffsetX, newOffsetY );
			// calculateNeededTiles( newZoom, 0, 0 );
			
			_zoomLevel = newZoom;
			_offsetX = newOffsetX;
			_offsetY = newOffsetY;
		}
	};
	
	// Work out which of the tiles we need to download 
	calculateNeededTiles = function( zoom, offsetX, offsetY ) {
		//
		// Calculate needed tiles
		//
		var tileZoomLevelArray = _tileZoomArray[zoom];
		console.log(tileZoomLevelArray)
		var canvasLeft = -offsetX, 
				canvasTop = -offsetY; 
		// var canvasLeft = offsetX, 
		// 		canvasTop = offsetY; 
		console.log(canvasLeft,canvasTop)	
		console.log(canvas.width,canvas.height)		
		var canvasRight = canvasLeft + canvas.width,
				canvasBottom = canvasTop + canvas.height;
		console.log(canvasRight,canvasLeft,canvasBottom,canvasTop)
		var tileLeft = 0, tileRight = 0, tileTop = 0, tileBottom = 0;
		var tile = null;
	
		var zoomWidth = tileZoomLevelArray[_aGetWidth],
				zoomHeight = tileZoomLevelArray[_aGetHeight];
		console.log(zoomWidth,zoomHeight)
		var columns = tileZoomLevelArray.length,
			rows = tileZoomLevelArray[0].length;
		console.log(columns,rows)
        var iColumn = 0, iRow = 0;
		var tileList = []; //new Array();
		for( iColumn = 0; iColumn < columns; iColumn++ )
		{
			for( iRow = 0; iRow < rows; iRow++ )
			{
				tile = tileZoomLevelArray[iColumn][iRow];
				console.log(tile)
				if( tile[_aGetTile] === null && tile[_aGetWaiting] === false )
				{
					console.log('jin')
					tileLeft = iColumn * _tileSize;
					tileRight = tileLeft + Math.min( _tileSize, zoomWidth - tileLeft );
					tileTop = iRow * _tileSize;
					tileBottom = tileTop + Math.min( _tileSize, zoomHeight - tileTop );
					console.log(tileLeft,tileRight,tileTop,tileBottom)
					console.log(canvasRight,canvasLeft,canvasBottom,canvasTop)
					if( !( tileLeft > canvasRight || tileRight < canvasLeft || tileTop > canvasBottom || tileBottom < canvasTop ) )
					// if( ( tileLeft< canvasRight || tileRight > canvasLeft || tileTop < canvasBottom || tileBottom > canvasTop ) )
					{
						console.log('request')
						// request tile!
						console.log(zoom, iColumn, iRow)
						tile[_aGetWaiting] = true;
						tileList.push( { "name" : zoom + "_" + iColumn + "_" + iRow, "file" : getTileFile( zoom, iColumn, iRow ) } );
					}
				}
			}
		}
		console.log(tileList)
		getTiles( tileList );
	};
	
	// Load the tiles we need with ImageLoader
	getTiles = function( tileList ) {
		if( tileList.length > 0 )
		{
			_imageLoader = new ImageLoader( {
				"images": tileList,
				"onImageLoaded":function( name, tile ) { tileLoaded( name, tile ); }
			} );
			// _imageLoader.setLoaded()
		}
	};
	
	// Tile loaded, save it.
	tileLoaded = function ( name, tile ) {
		var tileDetails = name.split("_");
		console.log(tileDetails)
		if( tileDetails.length === 3 )
		{
			var tileInfo = _tileZoomArray[tileDetails[0]][tileDetails[1]][tileDetails[2]];
			tileInfo[_aGetTile] = tile;
			tileInfo[_aGetWaiting] = false;
			console.log(tileInfo)
			paint();
		}
	};
	
	paint = function () {
		
		var canvasWidth = canvas.width,canvasHeight = canvas.height;
		//
		// Clear
		//
		_ctx.fillStyle = _ctx.strokeStyle = "#fff";
		_ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
		
		//
		// Show images
		//
		var tileZoomLevelArray = _tileZoomArray[_zoomLevel];
		console.log(tileZoomLevelArray)
		var columns = tileZoomLevelArray.length,
				rows = tileZoomLevelArray[0].length;
		console.log(columns,rows)
		var canvasLeft = -_offsetX,canvasTop = -_offsetY;
		// var canvasLeft = _offsetX,canvasTop = _offsetY;
		var canvasRight = canvasLeft + canvasWidth,
				canvasBottom = canvasTop + canvasHeight;
		console.log(canvasLeft,canvasRight,canvasBottom)
		var tileLeft = 0, tileRight = 0, tileTop = 0, tileBottom = 0; 
		var tileCount = 0;
		var tile = null;
		
		var zoomWidth = tileZoomLevelArray[_aGetWidth];
		var zoomHeight = tileZoomLevelArray[_aGetHeight];
		console.log(zoomWidth,zoomHeight)
		// TODO: This pastes a low resolution copy on the background (It's a bit of a hack and quite slow. A better solution is to find a nearer zoom)
		var fullTile = _tileZoomArray[_zoomLevelFull][0][0][_aGetTile];
        console.log(fullTile)
        var iColumn = 0, iRow = 0 ;
		// TODO: Improve this by working out the start / end column and row using the image position instead of looping through them all (still pretty fast though!)
		for( iColumn = 0; iColumn < columns; iColumn++ )
		{
			for( iRow = 0; iRow < rows; iRow++ )
			{
				console.log(iColumn,_tileSize,iRow)
				tileLeft = iColumn * _tileSize;
				tileRight = tileLeft + Math.min( _tileSize, zoomWidth - tileLeft );
				tileTop = iRow * _tileSize;
				tileBottom = tileTop + Math.min( _tileSize, zoomHeight - tileTop ); 
				console.log(tileLeft,tileRight,tileTop,tileBottom)
				if( !( tileLeft > canvasRight || tileRight < canvasLeft || tileTop > canvasBottom || tileBottom < canvasTop ) )
				// if( ( tileLeft< canvasRight || tileRight > canvasLeft || tileTop < canvasBottom || tileBottom > canvasTop ) )
				{
					tile = tileZoomLevelArray[iColumn][iRow][_aGetTile];
					console.log(tile)
					console.log(_offsetX,_offsetY)
					tileLeft += _offsetX;
					tileRight += _offsetX;
					tileTop += _offsetY;
					tileBottom += _offsetY;
					
					if( tile !== null )
					{
						console.log('tile')
						console.log(tile)
						console.log(tileLeft,tileRight,tileTop,tileBottom)
						// Draw tile
						_ctx.drawImage( tile, tileLeft, tileTop );
						// _ctx.drawImage( tile, 0, 0 );

						if( _debug )
						{
							_ctx.strokeRect( tileLeft, tileTop, _tileSize, _tileSize );
							tileCount++;
						}
					}
					else
					{
						//
						// Tile still loading
						//
						console.log('still')
						if( !_debugShowRectangle )
						{
							console.log('draw')
							// _ctx.save();
							// _ctx.beginPath();
						
							// _ctx.moveTo( tileLeft, tileTop );
							// _ctx.lineTo( tileRight, tileTop );
							// _ctx.lineTo( tileRight, tileBottom );
							// _ctx.lineTo( tileLeft, tileBottom );
							// _ctx.closePath();

							// _ctx.clip();

							console.log(fullTile)
							console.log(_offsetX,_offsetY,zoomWidth,zoomHeight)
							// TODO: Fill with a lower zoom image. (or possible use combination of higher zooms??)
							// but scaling images in canvas still VERY SLOW.
							// THIS NOTABLY SLOWS DOWN PANNING WHEN IMAGES ARE NOT YET LOADED ON SOME BROWSERS.
							_ctx.drawImage( fullTile, _offsetX, _offsetY, zoomWidth, zoomHeight );
							// _ctx.drawImage( fullTile, 0, 0, zoomWidth, zoomHeight );
							
							_ctx.restore();
						}
						else
						{
							_ctx.fillStyle = "#999";
							_ctx.fillRect( tileLeft, tileTop, tileRight - tileLeft, tileBottom - tileTop );
						}
					}
				}
			}
		}
		
		//
		// Canvas area
		//
		_ctx.strokeStyle = "#000";
		_ctx.strokeRect( 0, 0, canvasWidth, canvasHeight );
		
		if( _debug )
		{
			// 
			// DEBUG!
			//
			_ctx.fillStyle = "#0f0";
			_ctx.font = "normal 12px Arial";
			
			// Text
			_ctx.fillText( _mouseX + "," + _mouseY + " | " + _offsetX + "," + _offsetY + " | " + tileCount, 0, 20 );
	
			// Grid
			_ctx.strokeStyle = "#f00";
			var x,y;
			for( y = 0; y < canvasHeight; y += _tileSize )
			{
				for( x = 0; x < canvasWidth; x += _tileSize )
				{	_ctx.strokeRect( x, y, _tileSize, _tileSize );  }
			}
		}
	};
	


    (function() { // setup

		// _zoomLevelMax = Math.ceil( Math.log( Math.max( imageWidth, imageHeight ))/Math.LN2 );
		// _zoomLevelMin = Math.ceil( canvas.width/_tileSize );
		console.log(_zoomLevelMax,_zoomLevelMin)
		_tileZoomArray = [];    //new Array( _zoomLevelMax );

		var reducingWidth = imageWidth;
		var reducingHeight = imageHeight;
		var zoomLevelStart = -1;
		var iZoom = 0, iColumn = 0, iRow = 0;
        var columns = -1, rows = -1;
        console.log(reducingWidth,reducingHeight)
		var izoomN = scale.length-1;
		// for( iZoom = _zoomLevelMax;  iZoom >= _zoomLevelMin; iZoom-- )
		for( iZoom = _zoomLevelMax;  iZoom >= _zoomLevelMin; iZoom=scale[--izoomN] )
		{
			var newiZoom = scale[izoomN],currentiZoom = scale[izoomN-1];
			var scalew = newiZoom/currentiZoom
			console.log(newiZoom,currentiZoom,scalew)

			console.log(iZoom,izoomN)
			console.log(reducingWidth,_tileSize)
			columns = Math.ceil( reducingWidth / _tileSize );
			rows = Math.ceil( reducingHeight / _tileSize );
			console.log(columns,rows)
			if( _zoomLevelFull === -1 && reducingWidth <= _tileSize && reducingHeight <= _tileSize ){
				// Largest full image inside single tile.
				_zoomLevelFull = iZoom;
			}
			
			if( zoomLevelStart === -1 && reducingWidth <= canvas.width && reducingHeight <= canvas.height ){
				// Largest full image inside single tile.
				zoomLevelStart = iZoom;
			}

			// Create array for tiles
			_tileZoomArray[iZoom] = []; //new Array(columns);
			for( iColumn = 0; iColumn < columns; iColumn++ )
			{
				_tileZoomArray[iZoom][iColumn] = []; //new Array(rows); 
			}
			
			// Set defaults
			_tileZoomArray[iZoom][_aGetWidth] = reducingWidth;
			_tileZoomArray[iZoom][_aGetHeight] = reducingHeight;
			for( iColumn = 0; iColumn < columns; iColumn++ )
			{
				for( iRow = 0; iRow < rows; iRow++ )
				{
					_tileZoomArray[iZoom][iColumn][iRow] = []; //new Array();
					
					_tileZoomArray[iZoom][iColumn][iRow][_aGetTile] = null;
					_tileZoomArray[iZoom][iColumn][iRow][_aGetWaiting] = false;
				}
			}
			
			reducingWidth /= scalew;
			reducingHeight /= scalew;
			// console.log(Math.pow(2, iZoom))
			// reducingWidth /= Math.pow(2, iZoom);
			// reducingHeight /= Math.pow(2, iZoom);
			// console.log(2*iZoom)
			// reducingWidth /= 2*(iZoom);
			// reducingHeight /= 2*(iZoom);
			// console.log(iZoom)
			// console.log(Math.pow(2, iZoom-1))
			// reducingWidth = reducingWidth/Math.pow(2, iZoom-1);
			// reducingHeight = reducingHeight/Math.pow(2, iZoom-1);
			currentiZoom = scale[izoomN];
		}
		console.log(_tileZoomArray)
		console.log(reducingWidth,reducingHeight)
		console.log(_zoomLevelFull,zoomLevelStart)
		// _zoomLevel = zoomLevelStart;
		// _zoomLevelMin = zoomLevelStart
		_zoomLevel = _zoomLevelFull;

		//
		// Initial tile load
		//
		var imageList = []; //new Array();	
		var imageId = 0;
		
		columns = _tileZoomArray[_zoomLevel].length;
		rows = _tileZoomArray[_zoomLevel][0].length;
		console.log(columns,rows)
		for( iColumn = 0; iColumn < columns; iColumn++ )
		{
			for( iRow = 0; iRow < rows; iRow++ )
			{
				imageList.push( { "id" : imageId++, "file": getTileFile( _zoomLevel, iColumn, iRow  ) } );
			}
		}
		
		imageList.push( { "id" : imageId, "file": getTileFile( _zoomLevelFull, 0, 0  ) } );
		console.log(imageList)
		_imageLoader = new ImageLoader( {
			"images": imageList,
			"onAllLoaded":function() { initialTilesLoaded(); }
		} );

		
	}());

}

export {
	CanvasZoom2
}