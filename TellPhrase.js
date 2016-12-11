exports.handler = (event, context, callback) => {
    var rtnPhrase = [
        "You're bad and you should feel bad.",
        "You're not as good as you think.",
        "Ya'll tilting Mike."];
    try{
        if(event.session.new){
        console.log("NEW SESSION");
        }

        switch (event.request.type) {
            case "LaunchRequest":
                console.log('LAUNCH REQUEST');
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse(rtnPhrase[Math.floor(Math.random()*3)], true),
                        {}
                    )
                );
                break;

            case "IntentRequest":
                console.log('INTENT REQUEST');
                var endpoint = "";

                switch(event.request.intent.name) {
                    case "dissFriends":
                        console.log('DEFAULT INTENT REQUEST');
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(rtnPhrase[event.request.intent.slots.PHRASE.value - 1], true),
                                {}
                            )
                        );
                        break;
                    case "dissFriendsRandom":
                        console.log('RANDOM INTENT REQUEST');
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(rtnPhrase[Math.floor(Math.random()*3)], true),
                                {}
                            )
                        );
                        break;
                    default:
                        console.log('ENTERED DEFAULT CALL S2');
                        throw "Invalid Intent";

                }

                break;
            case "SessionEndedRequest":
                console.log('SESSION ENDED REQUEST');
                break;
            default:
                console.log('ENTERED DEFAULT CALL S1');
                context.fail('INVALID REQUEST TYPE: ${event.request.type}');
        }
    } catch(error){
        context.fail('Caught Error');
    }
};

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  };

};

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };

};
