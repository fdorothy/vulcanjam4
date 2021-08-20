VAR points = 0
VAR size = 1
VAR time = 10
VAR size_cost = 10
VAR time_cost = 10

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

== help ==

This is an interactive fiction game.
:br
Click through the different options to play.
:br
There are multiple endings.
:br
:clear
-> title

== intro ==

:bg car.png
:block left
You wander back to your car, the club's music still ringing in your ears.
:thumbnail public/underpass_thumbnail.png
:br
:location morris
The hot summer rain evaporates in a mist above the cobblestones.
:br
:location rainbow_bridge
The homeless sleep on their cardboard mats beneath the nearby railroad underpass.
:br
Their blankets illuminated by the rainbow lights.
:br
You are back at your car.

 * [Look for keys] -> missing_keys

== morris ==

This is morris ave.
-> DONE

== rainbow_bridge ==

This is the rainbow bridge.
-> DONE

== missing_keys ==

You check your pockets. The keys are not there.

-> DONE