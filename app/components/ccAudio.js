'use strict';

angular.module('ccApp')
  .directive('ccAudio', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var scale_1 = ["A3", "C3", "D3", "E3", "F3", "G3", "A4", "C4", "D4", "F4", "G4"];
        var scale_2 = ["C2", "D2", "A2", "C3", "D3"];

        var oscBass = new Tone.Oscillator(440, "sine");

        // feedback
        var feedbackDelay = new Tone.PingPongDelay("8n", 0.6);
        oscBass.connect(feedbackDelay);
        feedbackDelay.toMaster();
        feedbackDelay.wet.value = 0.8;

        // panner
        var panner = new Tone.AutoPanner(0.5);
        panner.toMaster();
        panner.dry = 0.1;
        oscBass.connect(panner);

        //connect it to the output
        oscBass.volume.value = -25;
        oscBass.toMaster();
        oscBass.start();

        var oscMelody = new Tone.Oscillator(440, "sine");
        oscMelody.toMaster();
        oscMelody.start();
        oscMelody.volume.value = -10;

        // vibrato
        var vibrato = new Tone.LFO(6, -25, 25);
        vibrato.start();
        vibrato.connect(oscMelody.detune);

        // feedback
        var feedbackDelay = new Tone.PingPongDelay("8n", 0.2);
        oscMelody.connect(feedbackDelay);
        feedbackDelay.toMaster();
        feedbackDelay.wet.value = 0.8;

        Tone.Transport.loopEnd = "1m";
        Tone.Transport.loop = true;

        Tone.Transport.setInterval(function(time){

        	var index = Math.floor( Math.random() * scale_1.length );
        	var freq = oscMelody.noteToFrequency( scale_1[ index ] );
            console.log("Played " + scale_1[ index ]);
            oscMelody.frequency.value = freq;
        }, "8n");

        Tone.Transport.setInterval(function(time){
        	var index = Math.floor( Math.random() * scale_2.length );
        	var freq = oscBass.noteToFrequency( scale_2[ index ] );
          oscBass.frequency.value = freq;

        }, "2n");

        Tone.Transport.start();
      }
    };
  });
