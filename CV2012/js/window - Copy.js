/************************************************************************************************************
Window
Copyright (C) October 2012  M. Samarin
http://safalra.com/web-design/javascript/pure-internal-windows/demonstration.html
************************************************************************************************************/
    // Window x co-ordinate (relative to the viewport)
	windowX=0; 


    // Window y co-ordinate (relative to the viewport)
	windowY=0; 

    // Window width
	windowWidth=0; 

    // Window height
	windowHeight=0; 

    // Window padding
	windowPadding=0; 

    // Window offset
    offset=0;

    // Speed of change in window offset
    offsetSpeed=0;

    // Vertical scrollbar position
    scrollbarY=0;

    // Mouse x co-ordinate (relative to the viewport)
    mouseX=0;

    // Mouse y co-ordinate (relative to the viewport)
    mouseY=0;

    // Whether the window is currently visible
    windowVisible=false;

    // Whether the window is currently selected
    windowSelected=true;

    // Whether the window is currently being moved
    beingMoved=false;

    // Mouse x co-ordinate (relative to left of window) when move began
    moveMouseX=0;

    // Mouse y co-ordinate (relative to top of window) when move began
    moveMouseY=0;

    // Whether the window is currently being resized
    beingResized=false;

    // Mouse x co-ordinate (relative to right of window) when resize began
    resizeMouseX=0;

    // Mouse y co-ordinate (relative to bottom of window) when resize began
    resizeMouseY=0;

    // Whether close has been pressed
    closePressed=false;

    // Begins the move process, by finding the mouse position
    function beginMove(){
      beingMoved=true;
  	  windowX=document.getElementById("internalWindow").style.right; 
	  windowY=document.getElementById("internalWindow").style.top; 
	
      moveMouseX=mouseX-windowX;
      moveMouseY=mouseY-windowY;
    }

    // Begins the resize process, by finding the mouse position
    function beginResize(){
      beingResized=true;
  	  windowX=document.getElementById("internalWindow").style.right; 
	  windowY=document.getElementById("internalWindow").style.top; 
	  windowWidth=document.getElementById("internalWindow").style.width; 
	  windowHeight=document.getElementById("internalWindow").style.height; 

      resizeMouseX=windowX+windowWidth-mouseX;
      resizeMouseY=windowY+windowHeight-mouseY;
    }

    // Called when the mouse is pressed down on the close button
    function mouseDownClose(){
      closePressed=true;
      document.getElementById('close').style.background='url(\'..\Window_files\close_down.png\')';
    }

    // Called when the mouse moves over the close button
    function mouseOverClose(){
      if (closePressed){
        document.getElementById('close').style.background='url(\'..\Window_files\close_down.png\')';
      }
    }

    // Called when the mouse moves off the close button
    function mouseOutClose(){
      if (closePressed){
        document.getElementById('close').style.background='url(\'..\Window_files\close.png\')';
      }
    }

    // Called when the mouse is released on the close button
    function mouseUpClose(){
      if (closePressed){
        document.getElementById('internalWindow').style.display='none';
        windowVisible=false;
        closePressed=false;
        document.getElementById('close').style.background='url(\'..\Window_files\close.png\')';
      }
    }

    // Displays the window
    function displayWindow(){
      document.getElementById('internalWindow').style.display='block';
      windowVisible=true;
    }
	
    // Hide the window
    function hideWindow(){
        document.getElementById('internalWindow').style.display='none';
        windowVisible=false;
        closePressed=false;    }

    // Checks whether the window should be selected or deselected
    function checkSelection(){
  	  windowX=document.getElementById("internalWindow").style.right; 
	  windowY=document.getElementById("internalWindow").style.top; 
	  windowWidth=document.getElementById("internalWindow").style.width; 
	  windowHeight=document.getElementById("internalWindow").style.height; 
	  windowPadding=document.getElementById("internalWindow").style.padding; 

      if ((mouseX>=windowX+windowPadding)&&
          (mouseX<windowX+windowWidth+windowPadding)&&
          (mouseY>=windowY+windowPadding)&&
          (mouseY<windowY+windowHeight+windowPadding)){
        if (!windowSelected) selectWindow();
      }else{
        if (windowVisible) deselectWindow();
      }
    }

    // Selects the window
    function selectWindow(){
      windowSelected=true;
      document.getElementById('title').style.background=
          'url(\'..\Window_files\title.png\')';
      document.getElementById('top').style.background=
          'url(\'..\Window_files\top.png\')';
      if (!closePressed){
        document.getElementById('close').style.background=
            'url(\'..\Window_files\close.png\')';
      }
    }

    // Deselects the window
    function deselectWindow(){
      windowSelected=false;
      document.getElementById('title').style.background=
          'url(\'..\Window_files\title_unselected.png\')';
      document.getElementById('top').style.background=
          'url(\'..\Window_files\top_unselected.png\')';
      document.getElementById('close').style.background=
          'url(\'..\Window_files\close_unselected.png\')';
    }

    // Deselectes all icons when the mouse button is released
    function deselectAll(){
      beingMoved=false;
      beingResized=false;
      closePressed=false;
    }

    // Updates the variables storing the mouse co-ordinates
    function mouseMoved(pageX,pageY,clientX,clientY){
      if (pageX){
        mouseX=pageX;
        mouseY=pageY-scrollbarY;
      }else if (clientX){
        mouseX=clientX;
        mouseY=clientY;
      }
    }

    // Updates the variable storing the vertical scrollbar co-ordinate
    function updateVerticalScrollbar(){
      if (window.pageYOffset){
        scrollbarY=window.pageYOffset;
      }else if (document.documentElement && document.documentElement.scrollTop){
        scrollbarY=document.documentElement.scrollTop;
      }else if (document.body){
        scrollbarY=document.body.scrollTop;
      }
    }

    // Updates the window offset and moves the window accordingly
    function updateWindowOffset(){
      if (offset>scrollbarY){
        if (offset-scrollbarY<-offsetSpeed*(1-offsetSpeed)/2) offsetSpeed++;
        if (offset-scrollbarY>(1-offsetSpeed)*(2-offsetSpeed)/2) offsetSpeed--;
      }
      if (offset<scrollbarY){
        if (scrollbarY-offset<offsetSpeed*(offsetSpeed+1)/2) offsetSpeed--;
        if (scrollbarY-offset>(offsetSpeed+1)*(offsetSpeed+2)/2) offsetSpeed++;
      }
      if (offset==scrollbarY) offsetSpeed=0;
      offset+=offsetSpeed;
      document.getElementById('internalWindow').style.top=windowY+offset+'px';
    }

    // Moves the window
    function updateWindowPosition(){
      windowX=mouseX-moveMouseX;
      windowY=mouseY-moveMouseY;
      document.getElementById('internalWindow').style.left=windowX+'px';
      document.getElementById('internalWindow').style.top=windowY+offset+'px';
    }

    // Resizes the window
    function updateWindowSize(){
  	  windowX=document.getElementById("internalWindow").style.right; 
	  windowY=document.getElementById("internalWindow").style.top; 
	  windowWidth=document.getElementById("internalWindow").style.width; 
	  windowHeight=document.getElementById("internalWindow").style.height; 

      windowWidth=Math.min(668,Math.max(256,mouseX-windowX+resizeMouseX));
      windowHeight=Math.min(450,Math.max(128,mouseY-windowY+resizeMouseY));
      document.getElementById('top').style.width=windowWidth-245+'px';
      document.getElementById('left').style.height=windowHeight-50+'px';
      document.getElementById('windowPane').style.width=windowWidth-12+'px';
      document.getElementById('windowPane').style.height=windowHeight-50+'px';
      document.getElementById('right').style.height=windowHeight-50+'px';
      document.getElementById('bottom').style.width=windowWidth-26+'px';
    }

    // Updates the position and size of the window
    function updateWindow() {
      updateVerticalScrollbar();
      updateWindowOffset();
      if (beingMoved) updateWindowPosition();
      if (beingResized) updateWindowSize();
    }

    // Interval to update the window
    window.setInterval('updateWindow();',20);