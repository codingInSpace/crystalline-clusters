'use strict';

angular.module('ccApp')
  .directive('ccAudio', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var scale_1 = ["D3", "E3", "F3", "G3", "A4", "Bb4", "C4"];
        var scale_2 = ["D3", "A3", "C4"];

        var osc = new Tone.Oscillator(440, "square");

        // feedback
        var feedbackDelay = new Tone.PingPongDelay("8n", 0.6);
        osc.connect(feedbackDelay);
        feedbackDelay.toMaster();

        // panner
        var panner = new Tone.AutoPanner(0.5);
        panner.toMaster();
        // panner.setDry(0.3);
        osc.connect(panner);

        // envelope
        // var env = new Tone.Envelope(2.5, 0.1, 0.1, 0.2);
        // env.connect(osc.output.gain);

        //connect it to the output
        osc.volume.value = -35;
        osc.toMaster();
        osc.start();

        var osc_bg = new Tone.Oscillator(440, "sine");
        osc_bg.toMaster();
        osc_bg.start();
        osc_bg.volume.value = -3;

        // vibrato
        var vibrato = new Tone.LFO(6, -25, 25);
        vibrato.start();
        vibrato.connect(osc_bg.detune);

        // feedback
        var feedbackDelay = new Tone.PingPongDelay("8n", 0.2);
        osc_bg.connect(feedbackDelay);
        feedbackDelay.toMaster();
        // feedbackDelay.setWet(0.8);

        Tone.Transport.loopEnd = "1m";
        Tone.Transport.loop = true;
        Tone.Transport.setInterval(function(time){

        	var index = Math.floor( Math.random() * scale_1.length );
        	var freq = osc_bg.noteToFrequency( scale_1[ index ] );
          	// osc_bg.setFrequency(freq);
            osc_bg.frequency.value = freq;
        }, "4n");

        Tone.Transport.setInterval(function(time){
        	var index = Math.floor( Math.random() * scale_2.length );
        	var freq = osc_bg.noteToFrequency( scale_2[ index ] );
        	// g_objs.get("head").osc.frequency.value = freq;
          osc.frequency.value = freq;

        }, "1m");

        Tone.Transport.start();
      }
    };
  });
