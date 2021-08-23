VAR money = false
VAR beer = false
VAR keys = false
VAR lostKeys = false
VAR knowsCharles = false
VAR awaken = false
VAR needsBeer = false
LIST Locations = (Avondale), (Rainbow), (Morris), Vulcan

-> title

== title ==

:bg public/skyline.png
:block subtitle
by @redmountainman1 
Made for Vulcan Jam 4, August 2021
:block text

 + [Start Game]
:block left
-> avondale_brewery

/*****************
 * AVONDALE
 */
== avondale_brewery ==

:clear
:bg public/bar.png

{! -> intro }
{! -> recap }
-> rough

= rough

Ah, <b>Avondale Brewery</b> again?
You sure do seem to like this place.
Too bad you're so awkward.
:br
:clear

-> bartender

= recap

Back at <b>Avondale Brewery</b> I see?
A local favorite.
Always an interesting crowd.
Never you, though.
You never have anything to say.
Never interesting.
Maybe that's why you bought that car.
You thought it would help you make friends, but now you've gone and lost the keys.
:br
:clear

-> bartender

= intro

It's been a long day, and an even longer night.
You sit at Avondale Brewery, drinking the memories away.
Every conversation has felt awkward throughout the day.
Every person's eyes look at you, judging you.
What's wrong with the world?
What is wrong with yourself?
:br
:clear

-> bartender

= bartender

- (opts)
:clear
:block subtitle
<b>Avondale Brewery</b>
:block left
A local favorite. Plenty of on-tap beers to choose from.

+ [Look Around]
A standard hipster bar.
Concrete floors, aged wooden counters.
Beards, tattooes, t-shirts and skirts.
Why are you here?
Huge vats of beer are brewing around the corner.
You can smell the hops.
You don't belong here.
+ [Get the Bartenders' Attention]
The bartender is wearing a green shirt with a picture of an elephant on it.
'What can I get you?' He grins.
{! He can't remember your name. }
{! 'Another round of Miss Fancy?' }
{! He remembers your beer, but not your name? }
{! That's depressing. }
** {money && needsBeer} [Buy a 6-pack of beer] ->
'Oh ho, taking some back home tonight?'
He still has no idea what your name is.
Why doesn't he just ask?
'Well, here you are.'
He hands you a 6-pack of beer and takes the money.
~ money = false
~ beer = true
++ {lostKeys} [I actually lost my keys]
The bartender shrugs his shoulders.
'What did they look like?'
You stutter out 'yeah, they had a charm attached to them...it was a'
+++ (spiritual) [Lucky Rabbit's Foot]
The bartender gives you a look.
'I didn't take you for a superstitious type.'
+++ (drunk) [Bottle Opener]
The bartender gives you a look.
'Hah, figures'
He winks.
+++ (religious) [Carved Wooden Cross]
The bartender gives you a look.
'I didn't take you for a religious type.'
---
He strokes his chin.
'I think I saw someone walk out of here with them.'
'He was wearing a black cloak, I think he's homeless.'
'Charles is his name. Always smells like piss.'
~ knowsCharles = true
++ [Yeah, I'll have a beer]
The bartender pours you a beer. It is pale yellow with a nice head of frothy foam.
You feel awkward sitting at this bar by yourself.
The bartender seems nice. Should you talk to him?
*** [Get his attention again]
Why would he want to talk to you? Are you sure you really want to try?
++++ [Yes]
You get his attention. He gives you a puzzled look.
But what are you going to say? It's hard to hear in here.
You feel the people sitting at the bar turn to stare at you.
They are always judging you.
+++++ [What time is it?]
He motions to the clock on the wall and says '10'.
You feel silly for asking such a question.
Very typical for someone like you.
Very awkward.
Is that really all you can talk about?
The time?
+++++ [What are you doing after this?]
'Uhh...what?' his face turns red, and you hear a girl snickering.
++++++ [Run Away] -> done
++++++ [What are you doing after work?]
'I'm actually going with some friends to the <b>Alabama Theater</b>,' he says
'They're playing Jaws. Why?'
+++++++ [Nevermind]
+++++++ [Got Room for One More?]
His face looks surprised.
Not the questioning glare that you usually receive.
You feel flustered.
'Sure! I actually have a spare ticket.'
'My shift is almost over. I'll meet you over there in a bit, OK?'
He seems excited that you asked.
+++++ [Where are the bathrooms?]
He motions over to the back of the bar.
You notice one of the other patrons covering a laugh with her hand.
+++++ [Nevermind]
++++ [No]
+++ [Nevermind]
++ [Nevermind]
The bartender gives you a puzzled look, then goes to help another patron.
+ [Leave]
-> done

-
:br
-> opts

- (done)
{! :clear }
{! You pay your tab and head for the door. }
{! Your car is parked pretty far away, on the other side of the Rainbow Bridge. }
{! You start walking over in that direction.}
{! :br }
{! :clear }
{! -> rainbow_bridge}
-> leave

/*****************
 * MORRIS
 */

== morris ==

:clear
:bg public/morris.png

- (opts)
:clear
:block subtitle
Morris Avenue
:block left
The hot summer rain evaporates in a mist above the cobblestones.
Your blue '67 Mustang is parked across the street.

+ (look_around) [Look Around] ->
{ not rat_defeated:
A large <b>rat</b> is eating something.
}
There's a place that sells <b>boiled peanuts</b> during the day.
:br
-> opts
+ (missing_keys) [Get Into Car] ->
You reach for the car keys in your pocket, but they're not there.
You must have left them back at the bar.
~ lostKeys = true
:br
-> opts
+ {look_around && !rat_defeated} [Inspect Rat] ->
The huge <b>rat</b> appears to be eating a cheeseburger.
++ [Attack Rat] ->
Seriously?
+++ [Yes, I attack]
OK, let me grab my dice...
+++ [Just Kidding] -> opts
---
You kick at the <b>rat</b>.
You deal <b>6 damage</b>
*** (rat_defeated) [Keep Attacking] ->
You kick the <b>rat</b> again.
You deal <b>8 damage</b>.
The <b>rat</b> hisses and runs away.
It drops something on the ground.
**** [Inspect Rat Droppings]
----
It appears to be <b>beer money</b>.
**** [Take it!]
----
You take the rat's beer money.
~ money = true
:br
-> opts
+++ [Run Away] ->
You run for it.
Where will you run to?
-> leave
++ [Run Away] ->
You run for it.
-> leave
+ [Leave] -> leave
-
:br
-> opts

/*****************
 * RAINBOW BRIDGE
 */

== rainbow_bridge ==

:clear
:bg public/underpass.png

- (opts)
:clear
:block subtitle
Beneath the <b>Rainbow Bridge</b>
:block left
A nasty tunnel, the sound of trains above.
The homeless sleep on cardboard mats.
Their blankets illuminated by the rainbow colored lights.

+ (look_around) [Look around] ->
The bridge is an old train overpass.
You hear the sound of trains moving overhead, shaking the ground.
{ not money: There is a <b>bag</b> on the ground. }
A <b>homeless man</b> {awaken: lays|sleeps} beneath ragged blankets on the ground{awaken:, staring up at you}.
* [Go to Your Car] ->
You head towards your car on Morris Avenue.
:br
-> morris
+ {look_around && !awaken && !money} [Inspect Bag]
There is some <b>money</b> in the bag and some needles.
** [Take Money]
You take the money.
~ money = true
++ [Leave it Alone]
--
-> opts
+ {look_around && knowsCharles} [{awaken: Talk to|Awaken} Homeless Man] ->
~ awaken = true
{! He shifts beneath his sleeping bag.}
{! A ragged face emerges from below the covers.}
You see his bloodshot eyes staring up at you.
++ {not beer} [Excuse me?]
His dry lips move but no sound comes out. He motions for something to drink.
~needsBeer = true
** (give_beer) {beer} [Give him a beer] ->
You hand him a can of beer, and a smile appears on his face.
He drinks it greedily.
:br
-> homeless_man_conversation
+ [Leave] -> leave
-
:br
-> opts

- (homeless_man_conversation)
:clear
'Thank...thank you,' he says with a slur as he sips some of the beer.
'My angel above, he sent you here, didn't he?'
* [I am no angel, just a person]
'A person? I was a person once, real flesh and blood.'
* [Yes, I come from up high]
'Lord have mercy!'
* [I'm looking for my keys]
'Keys? If I had keys I wouldn't be sleeping here.'
-
The homeless man gazes up at the roof of the bridge.
'Charles always said that one day I would find my angel.'
* [Did you say Charles?]
- 
'Yes sir,' he says, eyeing the other 5 beers.
'Lives under the Vulcan, in a cave.'
'Says that the sound of the water helps him think.'
~ Locations += Vulcan
* [Think About What?]
'Oh, I don't know what he thinks. You'll have to ask him.'
* [Thanks]
The homeless man takes another drink, leaning back on his elbows.
'This is the life, aint' it, hero?'
You nod, though you don't quite understand what he means.
What kind of life is it to spend all your time drunk under a filthy bridge?
And yet here was this man, a smile on his face, and not a care in the world.
Now, you think you have a place to go.
Maybe you'll find your keys afterall.
-
:br
-> leave

/*****************
 * VULCAN
 */
== vulcan ==

:clear
:bg public/vulcan.png

- (opts)
:clear
<b>Vulcan</b> park.
A giant cast-iron statue of Vulcan stands above the mountain.

+ (looked_around) [Look Around] ->
There is a <b>tunnel</b> entrance.
+ (enter_tunnel) {looked_around} [Enter Tunnel] ->
You enter the tunnel.
:br
-> tunnel_entrance
+ [Leave] -> leave
-
:br
-> opts

/*****************
 * TUNNEL
 */
== tunnel_entrance ==

:clear
:bg public/gate.png

- (opts)
:clear
<b>Tunnel</b>
The tunnel is dark and cold, and you hear the sound of water flowing somewhere below.
The dim glow of the city can be seen through the rectangular outline of the entrance.

+ (looked_around) [Look Around] ->
The spray painted walls are moist.
There is a <b>gate</b> that leads outside
There are old cans of beer on the smooth dirt floor
The tunnel <b>descends</b> into darkness
+ {looked_around} [Descend] ->
You descend down a gradual slope.
The air is cool and thick with moisture.
The sound of flowing water becomes louder.
:br
-> underground_river
+ [Leave] ->
You squeeze through the <b>gate</b>.
:br
-> vulcan
-
:br
-> opts

/******************
 * UNDERGROUND_RIVER
 */
== underground_river ==


~ temp has_fire = 1

- (opts)
:clear
You stand in an open room, far below Vulcan park.
{ has_fire: Someone sits by a small fire. | It is dark. }

+ {has_fire} [Approach Fire]
As you walk towards the fire, you see an old man hunched over, wearing a black hooded cloak.
** [Hello?]
The man motions for you to sit.
*** [Sit]
---
'Have you lost your way?' he says, a smile on his face.
*** [I'm just looking for my keys]
He holds up a walking stick.
You see your keys dangling from the end of it.
You take them.
:br
-> storytime
+ [Scream] ->
You scream in terror. {has_fire: Somone quickly puts the fire out.}
You are surrounded by darkness.
~has_fire = 0
+ {has_fire == 0} [Wait around] ->
You wait around patiently.
Someone rekindles the fire, and sits next to it.
~has_fire = 1
+ [Leave] ->
You head back for the tunnel entrance.
-> tunnel_entrance
-
:br
-> opts

= storytime

:block title
You Made It
:br

:clear
:bg public/skyline.png

<b>Epilogue</b>
What is this place, down in this dark tunnel below the iron giant where an old man sits by his lonely fire?
You went to find the keys, but what do they unlock?
Just a car?
Or perhaps the keys unlock something else...
There isn't anything to fear in this world, as long as you're willing to talk to strangers.

-> DONE

/*****************
 * UTILITIES
 */
== leave ==

:clear
Where to?

 + {Locations has Avondale} [The Brewery]
 -> avondale_brewery
 + {Locations has Rainbow} [Rainbow Bridge]
 -> rainbow_bridge
 + {Locations has Vulcan} [Vulcan Statue]
 -> vulcan
 + {Locations has Morris} [Morris Avenue]
 -> morris
