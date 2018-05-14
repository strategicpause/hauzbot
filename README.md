*  Authentication
    * [API](https://dev.twitch.tv/docs/authentication/)
        * [Register account](https://dev.twitch.tv/docs/authentication/#registration)
            * [Streamer-Bot](https://glass.twitch.tv/console/apps/i21qxa1jgbsid3wnizdoz5lz7l5esy)
        * Get a Token
        * Send a token.
* Clipping
    * [API](https://dev.twitch.tv/docs/api/reference/#create-clip)
    * Input
        * broadcaster_id
    * Output
        * edit_url - URL of the edit page for the clip.
        * id - ID of the clip that was createed
* Whipser
    * Whispering would be used to provide the edit URL to the user.
    * [API]()
* Chat Bot
    * [Docs](https://dev.twitch.tv/docs/irc/)
* Questions
    * Does the broadcaster\_id remain the same? Would we receive the broadcaster\_id from the authentication process?
* Sequence Diagrams
    * "Alexa, Ask Hauz bot to connect."
        * **Descripton**: Connects and joins the broadcaster's channel.
        * Utterance -> Alexa Skill
            * The skill will be invoked from the customer utterance. We should receive some sort of identification information, so we know who is interacting with the skill.
        * Alexa Skill -> Twitch Bot API
            * The bot will disconnect from the Twitch streamer's channel 
    * "Alexa, Ask Hauz bot to disconnect." 
        * **Descripton**: Disconnects and leaves the broadcaster's channel.
        * Utterance -> Alexa Skill
            * The skill will be invoked from the customer utterance. We should receive some sort of identification information, so we know who is interacting with the skill.
        * Alexa Skill -> Twitch Bot API
            * The bot will disconnect from the Twitch streamer's channel 
    * "Alexa, Ask Hauz bot to clip that."
        * **Description**: Creates a clip of the previous TK seconds.
        * Utterance -> Alexa Skill
            * The skill will be invoked from the customer utterance. We should receive some sort of identification information, so we know who is interacting with the skill.
        * Alexa Skill -> Twitch Clip API
            * Using the user's credentials we will ask the Twitch API to create a clip on their behalf.
        * Alexa Skill <- Twitch Clip API
            * The Clip API will respond with the Clip ID and the Edit URL for the clip.
        * Alexa Skill -> Twitch Chat Bot
            * The twitch bot will post the URL of the clip in the channel for the users.
        * Alexa Skill -> Whisper Broadcaster
            * The twitch bot will send a whisper to the broadcaster with the edit URL for the clip.
* MVP
    * Connnect and disconnect from a hardcoded channel.
    * Receive the clip utterance to clip a hardcoded broadcaster_id. 
    * Outputs the Clip URL in the channel.

