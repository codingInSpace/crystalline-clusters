'use strict';

angular.module('ccApp')
  .directive('ccAudio', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var scale_1 = scope.dMinor;
        var scale_2 = scope.dMinorBass;

        var oscBass = new Tone.Oscillator(440, "sine");

        // feedback
        var feedbackDelay = new Tone.PingPongDelay("8n", 0.6);
        oscBass.connect(feedbackDelay);
        feedbackDelay.toMaster();
        feedbackDelay.wet.value = 0.3;

        // panner
        var panner = new Tone.AutoPanner(0.5);
        panner.toMaster();
        panner.dry = 0.3;
        oscBass.connect(panner);

        //connect it to the output
        oscBass.volume.value = -18;
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


        // Connect and disconnect cool effects from time to time
        setInterval(function() {
            if (Math.random() > 0.8) {
                var dist = new Tone.Distortion(0.5).toMaster();
                var autoWah = new Tone.AutoWah(500, 3, -20).toMaster();
                oscMelody.connect(dist);
                oscMelody.connect(autoWah);

                // Then go back to normal again
                setTimeout(function() {
                    dist.dispose();
                    autoWah.dispose();
                }, 22000);
            }
        }, 25000);

        Tone.Transport.loop = true;
        Tone.Transport.scheduleRepeat(function(time){

        	var index = Math.floor( Math.random() * scale_1.length );
        	var freq = oscMelody.noteToFrequency( scale_1[ index ] );
            // console.log("Played " + scale_1[ index ]);
            oscMelody.frequency.value = freq;
        }, "8n", "1m");

        Tone.Transport.scheduleRepeat(function(time){
        	var index = Math.floor( Math.random() * scale_2.length );
        	var freq = oscBass.noteToFrequency( scale_2[ index ] );
          oscBass.frequency.value = freq;

        }, "2n", "1m");

        // Pause melody from time to time
        setInterval(function() {
            if (Math.random() > 0.85) {
                oscMelody.stop();

                // Then start again
                setTimeout(function() {
                    oscMelody.start();
                }, 15000);
            }
        }, 20000);

        Tone.Transport.start();

        // Change played scale when item selected in gui
        scope.$watch('scale', function (value) {
            if (value == "dMinor") {
                scale_1 = scope.dMinor;
                scale_2 = scope.dMinorBass;
            }

            else if (value == "cDorian") {
                scale_1 = scope.cDorian;
                scale_2 = scope.cDorianBass;
            }

            else if (value == "aLydian") {
                scale_1 = scope.aLydian;
                scale_2 = scope.aLydianBass;
            }
        });
      }
    };
  });
