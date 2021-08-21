VAR money = 3.50

-> title

== title ==

:bg skyline.png
:block subtitle
by @redmountainman1 
Made for Vulcan Jam 4, August 2021
:block text

 + [Start Game] -> start_game

== start_game ==

:clear
:start
-> intro

/*****************
 * INTRO
 */
== intro ==

:bg car.png
:block left
It's been a long day, and an even longer night.
:br
You sit at Avondale Brewery, drinking the memories away.

- (opts)
	*	'Can I get a uniform from somewhere?'[] you ask the cheerful guard.
		'Sure. In the locker.' He grins. 'Don't think it'll fit you, though.'
	*	'Tell me about the security system.'
		'It's ancient,' the guard assures you. 'Old as coal.'
	*	'Are there dogs?'
		'Hundreds,' the guard answers, with a toothy grin. 'Hungry devils, too.'
	// We require the player to ask at least one question
	*	{loop} [Enough talking] 
		-> done
- (loop) 
	// loop a few times before the guard gets bored
	{ -> opts | -> opts | }
	He scratches his head.
	'Well, can't stand around talking all day,' he declares. 
- (done)
	You thank the guard, and move away. 

You had a few beers at Avondale Brewery.
:br
Now it's time to go.
:br
:location rainbow_bridge
:location avondale
:page locations
-> DONE

/*****************
 * MORRIS
 */

== morris ==

This is morris ave.
The hot summer rain evaporates in a mist above the cobblestones.
:br

-> DONE

/*****************
 * RAINBOW BRIDGE
 */

== rainbow_bridge ==

You are beneath the Rainbow Bridge.
:br
The homeless sleep on their cardboard mats.
Their blankets illuminated by the rainbow lights.
:br

 + [Look around] ->
   You look around.
 + [Awaken Homeless Man] ->
   You awaken a homeless man.

 - -> DONE

/*****************
 * AVONDALE
 */

== avondale_brewery ==

You are at Avondale Brewery.
:br
There are a few people still sitting at the bar.
:br
There is a handsome man sitting by himself at the bar.

 + [Look Around] ->
   You look around.
 + [Wave to Bartender] ->
   You wave to the bartender.
 + [Flirt] ->
   You flirt.
 - -> avondale_brewery

/*****************
 * ALABAMA THEATER
 */

== alabama_theater ==

You are at the Alabama Theater.

-> DONE

/*****************
 * VULCAN
 */
== vulcan ==

You are at Vulcan park.

-> DONE
