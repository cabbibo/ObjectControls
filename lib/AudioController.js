function AudioController(){

  //if( 
  try {
    window.AudioContext = window.AudioContext ||window.webkitAudioContext;
  }catch(e) {
    alert( 'WEB AUDIO API NOT SUPPORTED' );
  }
 
  this.ctx      = new AudioContext();

  this.gain     = this.ctx.createGain();

  this.gain.connect( this.ctx.destination );

  this.updateArray = [];

  this.notes = [];

}


AudioController.prototype.update = function(){

  
  for( var i = 0; i < this.notes.length; i++ ){

    this.notes[i].update();

  }

  for( var i = 0; i < this.updateArray.length; i++ ){

    this.updateArray[i]();

  }



}

AudioController.prototype.addToUpdateArray = function( callback ){

  this.updateArray.push( callback );

}

AudioController.prototype.removeFromUpdateArray = function( callback ){

  for( var i = 0; i< this.updateArray.length; i++ ){

    if( this.updateArray[i] === callback ){

      this.updateArray.splice( i , 1 );
      //console.log( 'SPLICED' );

    }else{

      //console.log('NO');

    }

  }

}


