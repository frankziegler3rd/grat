---
date created: 2025-10-06T01:48
date modified: 2025-11-30T17:48
---
## Prior to the date below is stuff I didn't log. This was mainly configuring and setting up the basics on the backend and setting up MongoDB. 
## 11/12/2025
- `UserService` method `authenticateUser` now returns the authenticated `User` object instead of a boolean, and `UserController` endpoint `/login` (which uses `authenticateUser`) stores the user ID as the value in the `UserService` `sessions` hash map instead of the email.
	- Originally `UserService` stored `{ token : email }` pairs which was an issue for shift storage because `Shift` objects have an associated `uid` user ID. Users who want to add new shifts would then need to pass their own user ID from the client side *for every request* which was not ideal. The `authenticateUser` method in `UserService` original return value was boolean (whether or not the user was authenticated), and it is now the `User` object because the user ID can be derived from that object and properly stored.
- `POST /shifts/add` coded, going to test.
	- Works
- `login.tsx` and `register.tsx` coded and fully communicate with respective `/login` and `/register` endpoints.
- Proper navigation now in place with Expo Router. Successful login requests lead to user homepage and the main app page served (on initial open) is `home.tsx` if the user has a token.
	- `onboard` coded with two buttons: login and register which lead to respective pages on press
- Tokens are saved locally via `AsyncStorage` from `react-native-async-storage`.
- Currently in need of logout functionality so more testing can be done
	- Need logout endpoint and client-side logout function on user `home.tsx` 
## 11/13/2025
- 3:00 PM
	- Stayed up til 4 AM last night trying to figure out the logout feature. Currently for navigation I'm using Expo Router, though *the way* I'm using it appears to be deprecated. I'm wondering if my current layout and method of navigating between pages is causing the issue.
		- The issue itself is that the app does not return to the root screen upon logout. The logout function successfully clears the token and pings the logout endpoint, but the UI doesn't re-render. 
- 5:15 PM
	- Divided app screens into two routing groups `(auth)` and `(app)` per Expo docs. 
	- Put initial routing logic in `index.tsx` so that the app loads the proper screen when opened (if user is logged in it displays home, else displays the onboarding screen)
	- Further routing logic is handled on appropriate events (i.e. login, register, logout)
		- login {submit} -> home
		- home {logout} -> onboard
		- onboard {login} -> login
		- onboard {register} -> register
	- Basically above issue fixed
- 11:00 PM
	- Integrated react-native-calendars and have a calendar displaying on the homepage
### 11/14/2025
- 1:30 PM
	- Looking into making the "new_shift" a modal screen. Have to research how to do this with Expo Router. 
	- Right now the RN calendar gives us a `day` object and I store the `day.dateString` attribute in `daySelected`, which is a state variable. There is a button below the calendar `+` that when pressed, should trigger the `new_shift` modal screen with input (clock-in, clock-out, tips, etc.) text boxes and when submitted post to the server.
- 2:32 PM
	- Modal screen displays on + button press. 
	- Modal screen needs to have input validation boxes and whatnot before I can test posting shifts to and getting shifts from the server. 
## 11/15/2025
- 9:31 PM
	- Building the new_shift modal, using react-native-community/date-time-picker for time picking.
	- Current issues: 
		- Pertinent
			- Date selector on home screen calendar state is inconsistent with what is currently selected. The daySelected is the previously selected date.
			- If a shift spans multiple dates (i.e. 8 PM to 2 AM), this does not account for that. I do not have a design in mind for that yet. Will require refactor if I get that far
				- 10:27 PM: Not to mention actually that the clock in time can be before the clock out time.
					- Ok I don't care so much about the logic as much as I do about getting it to work. The logic can be corrected later. 
		- Non-pertinent
			- DateTimePicker is not as pretty on Android. Android time pickers are modals and not spinners like on iOS. Need to consider this down the line
			- 
	- 3:13 AM
		- Some progress made on `new_shift` to add metrics. Is proving to be relatively complex especially without styling. Coded `+ add metric` button to conditionally render a dual-textbox for name-value pairs, but there is no specific type or set of types to the value. I'm starting to think I should give users ability to select the type (string, number, list, map) to reduce complexity of this ability (at least for now). 
		- Button does not work, currently:
		
```tsx
            <Button mode="contained" onPress={() => { setShowMetricForm(true) }}>+ add metric</Button>
            { showMetricForm && (
                <View>
                    <TextInput placeholder="metric name" style={{ width: 250 }}/>
                    <TextInput placeholder="metric value" style={{ width: 250 }}/>
                </View>
            )}
            { metrics.map((metric, index) => (
                <View key={index}>
                    <TextInput
                        placeholder="metric name"
                        value={metric.name}
                        onChangeText={text => updateMetricName(index, text)}
                        style={{ width: 250 }}
                    />
                    <TextInput
                        placeholder="metric value"
                        value={metric.value}
                        onChangeText={text => updateMetricValue(index, text)}
                        style={{ width: 250 }}
                    />
                </View>
            ))}
            <Button mode="contained" onPress={submitShift}>Submit</Button>
```

cool and all but the placeholder view doesn't become part of the map.
## 11/16/2025
- 8:55 PM
	- The previously mentioned issue fixed. "New metric" textbox pairs render on "+ add metric" button, and join the map on "+" button. 
		- No sanitization of input here and the metric values are only strings (currently). Will need to fix. 
- 10ish PM?
	- Post mechanism works but doesn't work. Not all data posts I suspect due to serialization-deserialization issues. 
## 11/22/2025
- 12:34 AM
	- 8 DAYS TIL PRESENTATION HERE IS WHAT NEEDS TO BE DONE
		- Login
			- Input sani
			- Password hide
			- Forgot password
		- Register
			- Input sani
			- Password hide
			- "this email or username is in our DB"
		- Home
			- Shift pull on date press
			- WRONG DATE IS STORED IN STATE VARIABLE ==FIXED==
			- Logout move to More page
			- WHY ISNT LOGOUT WORKING ==FIXED==
		- New shift modal
			- Input sanitization
			- Data type selection for metrics (list, string, number)
			- Not all shift data posts (clockin, clockout, tips dont post) ==FIXED==
		- Charts
			- everything
		- More 
			- Logout
			- idk yet
		- TABS LAYOUT FOR APP STACK ==FIXED==
		- CFUCKINGSS MAKE IT PRETTY
	- 1:19 AM
		- Logout works now. Writeup:
			- The backend uses a `sessions` map of `{ token : uid }` pairs. The issue was that when the server goes down or quits, all of the sessions disappear. But the token on the frontend isn't revoked when that happens. So when the user tries to logout, the server couldn't find the session with that token, thus the request couldn't be completed. I was looking mainly for a band-aid fix so I just treated that error as not a real error. 
## 11/22/2025
- 2:59 PM
	- Tips now officially post. The issue was probably a number of things:
		- Backend did not store those values with the `JsonProperty` tag so they weren't being deserialized. 
		- Frontend was storing the initial state as doubles but they should've been strings given `TextInput` can only do strings. I setup the submit method to send them as floats on submit. Seems to work
	- Clock in and clock out date times don't seem to post. Gonna work on that now
- 4:04 PM
	- Dates now post too woop
- 5:20 PM
	- Tabs works! I now have a navbar. 
		- Had to restructure my layout files but expo-router is crazy simple. Each layout defines a navigation container. 
- 5:49 PM
	- The date stored in the state variable is actually correct. There was never an inconsistency. The `handleDayPress` function was just logging the un-updated state variable before the re-render. 
```tsx
    const handleDayPress = (day) => {
        setDaySelected(day.dateString);
        console.log(daySelected);
        // axios.get(shifts on this day)?
    }
```
- 7:26 PM
	- tab bar has icons now!
- 7:58 PM
	- see [[grat product backlog]]
- 11:51 PM
	- had to rework a bunch of shit.
	- the datetime constructed and sent over to the backend was being stored in UTC (with timezone offset Z). 
	- this was causing issues with retrievals and leading to inconsistent shift data. 
	- proper fix was to write a formatting function to format the datetimes stored in the clockIn and clockOut state variables, and format them to what the backend expects prior to the send. 
	- i also ran into a node_modules error. a file got corrupted somehow and couldn't figure that out for awhile. was able to fix it with a fresh npm install
	- shift data is (largely) retrieved and logged on the frontend, gonna work on displaying it now
- 1:50 AM
- shift pull on date press works! the shift components (aptly named shift) display in list format in the bottom half of the home page. when they are pressed, a modal does open. 
- the modal needs to display the details of the shift including the metrics. it just needs to be a detailed overview of the shift. in a perfect world it would be an editable version of the shift but i don’t currently have a backend endpoint for that. 
- it also looks like doodoo its basically just a pressable combination of 3 text boxes but i can style it pretty easily. 
- i am going to update the [[grat product backlog]] and log off for the night
## 11/23/2025
- 1:46 PM
	- styled the shifts pulled from database on date press to render pressable and in a list format (with times and tips displayed)
	- issue is, they're being submitted for the wrong date. 
		- WRONG DATE IS STORED IN STATE VARIABLE ✅
			- is *not* fixed.
- 2:04 PM
	- JS Dates are a nightmare
- 2:25 
	-  i belueve i have fixed the issue. i wrote a createLocalDate function that parsed the string and called a different Date constructor that takes the individual parameters instead of a string. the one that *does* take a string parameter auto-converts it to UTC so my clock ins and outs were being stored as 5 hours earlier than they actually were. 
	- very fucking confusing
- 9:45 PM
	- alright i've had an on-and-off day of working on this, but the homepage looks pretty nice (ish). i really wish i was more of a UI/UX designer but even without that skill i think it looks pretty good. 
## 11/25/2025
- 5:46 PM
	- FINALLY figured out the server issue. 
	- Moved the `baseURL` to a global constant in api.ts that read:
		- `export const baseURL = "..." // url here`
	- Imports into server-connecting files read
		- `import baseURL from "../../api.ts";`
	- The fix was in the import:
		- `import { baseURL } from "../../api.ts";`
			- because baseURL was a named constant, it needed the brackets.
			- Fucking JS.
- 11:20 PM
	- MASSIVE MASSIVE UI update.
		- Theming with RNP's theming capabilities and useTheme hook
		- Added header bar with SVG mini logo
		- Totally changed the theme
		- Absolutely revamped the new_shift form UI.
		- Updated the metric boxes to be side-by-side and look like Obsidian's properties
			- Also added +, cancel, and trash can icons for adding, canceling, and deleting metrics
		- Added icons to text boxes
		- Realigned everything etc.
		- Gonna go back and revamp login, register, onboard, do shift modal, profile/settings, and then finally the stats page
- 3:03 AM -- SIGNING OFF
	- Tasks completed:
		- Login
			- Input sani✅
			- Password hide✅
			- Forgot password✅
			- Logo✅
		- Register
			- Input sani✅
			- Password hide✅
			- Logo✅
		- Shifts should include position and location ngl✅✅✅
		- Massive UI overhaul of login, register, and onboard to match home and new_shift screens
	- NEXT STEPS
		- Need keyboards to disappear on outside touches.‼️‼️‼️‼️
			- need this to be true for all screens (cuz its only true for some)
				- check login and register specifically
		- Need a clean settings page.
			- Need a plan for said settings page. 
		- Need a clean shift modal page. 
		- Then I will focus on charts/stats. 
		- Then I should have my MVP!
		- Data type selection for metrics on the new_shift modal would be great, but is a stretch goal at this point. 
## 11/26/2025
- 3:52 PM
	- All keyboards dismiss on outside taps
- 3:59 PM
	- Ok I'm starting to get a bit torn about my app flow. 
- 4:13 PM
	- Alright here is what I've decided my flows should change to.
	- onboard → login → home
	- onboard → register → home
	- home → add shift → new shift modal → home
	- home header → settings → (various settings)
	- tab bar { home | stats | history }
	- history → shift press → view & edit shift
	- history → search (search params) → search return
	- need to determine stats flows and charting. i will work on this last.
	- to build a full product i should really get the above sorted out.
	- deadline is tight
- 2:27 AM -- SIGNING OFF
	- Not my most productive day. 
	- Settings page is all polished and good to go.
		- I should note that basically all of the settings don't do anything though. It's mostly just to look pretty and those associated settings-pages will need to be completed at a later date. 
	- Did some minor UI updates, i.e. header bar logo, coloring, etc.
	- Moved `profile` to `history`, so main app tabs are `home | stats | history`.
	- Moved `settings` to its own stack, accessible via gear icon rendered in the header bar. 
	- `stats` retrieves all user shifts from DB on initial render (or "mount"). Did some backend work for this. 
		- It's going to need to in order to format data for the Victory Native charts. 
		- I also do have a bit of a flow in mind for this page also:
			- Top widget could be income analytics
			- Middle widget could be a horizontal carousel of charts and users can add as many as they want.
				- Now note that charts would need to be stored somehow. Need to look into potential ideas but that could be stretch goal. 
			- At the bottom: no idea.
	- Big pain point for me right now is rendering of Shift objects. I don't have a great design in mind but it's going to be really important to come up with a clean design for this.
		- Should mention that *Card* version and *Screen* version are both equally important here. Card taps lead to screen versions where shifts are editable. That would also mean an `updateShift` endpoint.
## 11/29/2025
- 1:59 AM
	- Victory Native XL is a MASSIVE. FUCKING. HEADACHE. Have no clue why I could not get it to work. Even the example from their docs wouldn't work. I suspect it's an Expo compatibility issue.
	- Switched gears to react-native-chart-kit and that is doing the job just fucking fine. I have my first chart working! Huge W.
- 3:45 AM
	- `history` page is up!
- 2:30 PM
	- shifts in history page also display date. Had to add `showDate` prop to shift component (bool) and run it true for the history page.
- almost there man.
## 11/30/2025
- 1:34 AM
	- still not really sure about the history page as a design pattern. kinda feels weird
	- having THAT and the shiftOnDatePress functionality feels a little redundant.
	- there is a benefit to the history page maybe as a main one. but something feels wonky about my flow. i just can't put my finger on it.
	- oh well it's too late to change it
	- the next thing i am going to do is write a backend endpoint to handle shift updates and code the frontend feature to modify shifts
		- press a shift object, opens modal (update_shift), edit whatever, submit it to endpoint
		- likely that the update_shift modal is going to look near exact to the new_shift modal
## 12/3/2025
- 2:10 AM
	- modify_shift modal opens, does indeed look exactly like new_shift but with the data stored in the text boxes. 
		- need to add a calendar picker to it. tbh i gotta figure out if i should use RN calendar for that. otherwise i worry it'll look weirdly different from the one on the home screen. idk what else i would do
		- also need to test the API for updating to make sure it works
		- should have a delete button and need to test that too
- 5:17 PM
	- backend
		- modified backend to use DTOs so as not to expose the domain object to the user.
		- coded endpoint, service, and repo logic to handle shift updates
		- still gotta do deletes
	- frontend
		- switched history page to use the useFocusedEffect with callback function to call for shifts on focus, works beautifully
		- tidied up submission logic and it works beautifully, some errors here and there but nothing major
		- going to add a date picker to it now
- 6:23 PM
	- alright, the date picker works. PITA
- 7:29 PM
	- delete works!
		- there was an issue with my repo. was declared `... extends MongoRepository<Shift, UUID>` but the actual ID was a String. so trying `deleteById` and `existsById` wouldn't work because their parameters are UUID type. so i changed the repository declaration, had to change shift grabs from the repo to `Optional<Shift>` type because that is what those methods, along with `findById` return. 
- 9:23 PM
	- just spent 2 hours debugging why shifts from 12:00 AM + don't display in home. 
	- because fucking
		- `List<Shift> findByUidAndClockInBetween(String uid, LocalDateTime start, LocalDateTime end);`
		- this query
		- start has been:
			- `LocalDateTime ldateStart = ldate.atStartOfDay();`
			- the QUERY WAS NOT INCLUSIVE OF THE START TIME
			- GUESS WHAT THE FIX WAS
				- `LocalDateTime ldateStart = ldate.atStartOfDay().minusSeconds(1);`
- 2:53 AM
	- spent a ton of my night fiddling around with the stats page.
		- added Averages, Charts, and Metrics carousels to fill the page for now
		- all three are horizontally scrollable but are hard coded and not dynamic
	- it is cool, but it is not very customizable which was not my vision.
	- to add customization on a per user basis is a tough job. i only have about 2 non-consecutive days' worth of development hours (and that's without considering all documentation requirements that I need to catch up on) and this needs, realistically, a full week. 
	- `register` should log users in automatically
	- `history` should be sortable and searchable
	- the fixed height for the calendar on `home` is really starting to bother me.
	- those are likely the last things i will do
- 3:06 AM
	- just fixed the fixed height on the calendar
	- also revamped the shift cards a bit
	- 
