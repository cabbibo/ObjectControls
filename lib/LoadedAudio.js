// TODO: Best way to update 

function LoadedAudio( controller ,  file , params ){

    this.loader;
    this.controller = controller;
    
    this.params = _.defaults( params || {}, {
        
      looping:      false,
      fbc:            128,
      fadeTime:         1,
      texture:       true,
      output:       this.controller.gain

    });

    this.hasLoaded = false;

    this.file       = file;

    this.playing    = false;

    this.looping    = this.params.looping;

    this.output     = this.params.output;
    
    this.buffer;

    this.filterOn       = false;
    this.gain           = this.controller.ctx.createGain();

    this.gain.connect( this.output );


    this.time = 0;


    this.loadFile();

  }

  LoadedAudio.prototype.reconnect = function( newOutput ){
   
    this.gain.disconnect( this.output );
    this.output = newOutput;
    this.gain.connect( this.output );
  
  }

  LoadedAudio.prototype._loadProgress = function(e){

    this.loaded =  e.loaded / e.total;
    
    this.loadProgress( e );

  //tween.start();
  }

  LoadedAudio.prototype.loadProgress = function(){}


  LoadedAudio.prototype.loadFile = function(){
  

    var request=new XMLHttpRequest();
	request.open("GET",this.file,true);
	request.responseType="arraybuffer";
   
    var self = this;
    request.onerror = function(){
      alert( 'ERROR LOADING SONG' );
      //self.womb.loader.addFailue( 'Capability to load song' , 'http://womble.com'
    }

  

    request.onprogress = this._loadProgress.bind( this );
    
    var self = this;
    
    request.onload = function(){

      self.controller.ctx.decodeAudioData(request.response,function(buffer){

        if(!buffer){
          alert('error decoding file data: '+url);
          return;
        }

        self.buffer = buffer;
        self.onDecode();

      })
    },

    request.send();

  }

  LoadedAudio.prototype.onDecode = function(){

    //gets just the track name, removing the mp3
    this.trackID= this.file.split('.')[this.file.split('.').length-2];

    this.createSource();

    //var self = this;
    //if( this.params.onLoad ) this.params.onLoad( self );

    this._onLoad();

  }

  LoadedAudio.prototype.createSource = function() {

    this.source         = this.controller.ctx.createBufferSource();
    this.source.buffer  = this.buffer;
    this.source.loop    = false;//this.looping;
          
    this.source.connect( this.gain );

    /*if( !this.looping ){
      
      this.gain.gain.value = 1;
    }*/

    //this.gain.connect( this.analyser );

  };

  LoadedAudio.prototype.destroySource = function(){
     
    console.log( 'DESTROY' );
    this.source.disconnect(this.gain);
    this.source = undefined;

  };

 

  LoadedAudio.prototype.stop = function(){

    this.playing = false;

    this.source.stop();

    this.createSource();

  };
		
  LoadedAudio.prototype.play = function(){
	
    //this.startTime = this.controller.womb.time.value;

    this.playing = true;

    this.source.start(0);
   
    // Creates a new source for the audio right away
    // so we can play the next one with no delay
   // if(this.source.loop == false){
      this.createSource();	
   // }
   //
   //this.controller.addToUpdateArray( this.update.bind( this ) );

  };

  LoadedAudio.prototype._onLoad = function(){

    if( this.looping ){
     
      
      looper.everyLoop( function(){

        if( this.playing ){
          this.play()
        }
      
      }.bind( this ));

      this.gain.gain.value = 0;

    }

    this.hasLoaded = true;

    this.onLoad();

    //this.controller.addToUpdateArray( this.update.bind( this ) );
    
  }
  LoadedAudio.prototype.onLoad = function(){}


  LoadedAudio.prototype.update = function(){

    if( this.playing ){
    
    }
  
  }

