# DOCKER

docker-compose run exec runs the container and swaps the command, so if you /bin/bash to a postgres server, now you have a server with no postgres and you are in it

to do psql
first get on to a box which is on the network which has the containers
then from there, do `psql meme_backend_development -h postgres.cloud66.local -U postgres

swap commands when running an image by overriding the CMD.
`docker run -it web --name web /bin/bash`
this will run a container by the name of "web" and it will load an image called "web" and when doing so it will run the command /bin/bash instead of the CMD specified in the Dockerfile. This is really useful. Also why we prefer to use CMD over ENTRYPOINT, as for the later overriding is a bit different and thus difficult.
Commands can also be run with docker-compose
`docker-compose run web \bin\bash`

use netcat to test

## To start on Local Machine

````
cd ~/code/meme_backend
docker build -t sandeep45/myrailsapp:v1 .

cd ~/code/meme-texter
docker build --build-arg APP_SERVER=app -t sandeep45/mynginxapp:v1 .

docker rm app
docker rm web

docker run --name app -p 4000:3000 sandeep45/myrailsapp:v1
docker run --name web -p 80:8080 --link app sandeep45/mynginxapp:v1
````



`cx servers list --stack meme-texter` - List my servers
`cx ssh giraffe --stack meme-texter` - SSH to the box
`docker ps` - gives running containers
`docker exec -it web.sensitive-good-robin /bin/bash` - get bash script for Web container
`docker exec -it app.easygoing-ambitious-scorpion /bin/bash` - get bash script for App container
docker
connect to a running container
`docker ps -l` and get the container id
`docker exec -it b1622ffcdd90 /bin/bash` runs bin/bash on the container

- Volumes
- env variables
- dev/prod workflow with callbacks/triggers
- build process - migration, assets, webpack etc.

multiple containers listening on the same external port, will get load balanced by c66.
(Elastic DNS)[http://help.cloud66.com/network/service-network-settings]
allows containers to access other containers by going to containername.cloud66.local
In my case from web container I can access upstream by doing api.cloud66.local:3000
Note I am referring the internal exposed port of the container and not the external port it maybe mapped to.

envsubst can be used to map enviornment variables to their values
````
echo "yo yo $HOSTNAME" | envsubst
yo yo a328cda1af6f
````

## WEB

Build docker container for meme-texter called "Web"
this has nginx internally working on port 8080.
it exposes it to port 80.
it also links to another container: "app".

````
docker build -t sandeep45/mynginx:v4 .
docker run --name web -p 80:8080 --link app -e "APP_SERVER=app" sandeep45/mynginx:v4
````

##  APP

Build docker container for meme-backend called "App"
this has rails server working on port 3000
it exposes it to port 3000.

````
cd ~/code/meme_backend$
docker build -t sandeep45/myrailsapp:v1 .
docker run --name app sandeep45/myrailsapp:v1
````
The nginx configuration is modified to connect to its upstream at "app"

the -p option goes like incoming_port:container_port.
the first port is the port on the host we will visit, which is then connected to the second port on the running container
in this case we are not exposing any port to the outside world as the web will directly connect to its 3000 port.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
npm install --save normalizr
npm install --save lodash
npm install --save autobind-decorator

setup loading of non fetched data on show page
componentWillMount() {
 loadData(this.props)
}

componentWillReceiveProps(nextProps) {
  if (nextProps.login !== this.props.login) {
    loadData(nextProps)
  }
}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
node uuid
save last state(perhaps just data) to localstorage and then hydrate from that
concise function declaration when a function is inside an object
use throttle for preveting too many calls to a function
create a root element in root.js
extract attributes from props, in the method paranthesis
with-router to get router params in ownProps.params in a deeply nested component( one that is not opened from a route)
in mapDispatchToProps, if the params of callback match the params of the action creator, then you can just pass a hash with callback name to action creator name. and it wil autoamtically dispatch the action creators result
using selectors to get data from a store. the selector knows what slice of the state to get data from and how to get it. the container's mapStateToProps, we will call that selector with the entire state to get the data the needed from the state and therefore we dont need to now know about how data is kept in the store.
in store maintain a hash(`byids`) with keys being ids and values being objects, then also maintain an array of ids(`allIds`). now you can write a selector(`getAllTodos`) to get an array of objects by mapping over each id and reading from the object.
use `console.group` and `console.groupEnd`
to do fetching of data in the UI, rather than in mapStateToProps, fetch the data in `componentDiDMount` and then again in `componentDidUpdate`. this assumes that fetching of the data depends upon something which causes the componentDidUpdate to fire. an e.g. of this is the url params. Its better to call an async action instead
write a middleware. we define what we want to do and then call the original dispatch. lets call the original dispatch - `next`, as its just the next function to be called and may have alreadyh been over-written. currying concept.
use combineReducer more than once.
keep a list of ids for ever tab/page
todos: {
    byId: {

    },
    idsByPage: {
        page1: [],
        page2: []
    }
}
on click of a tab/page, fetch the daata.
store the structure of the state in the selectors, this way we dont have cascading effects when state structure changes
In the component's/container render you can do `return <h1> No data </h1>` if data.length == 0. Same can be done for isFetching.
There can be a reducer called `isFetching`. This can store boolean for data being fetched. We can store it by the name of the slice which is being fetched.
page1: [1,2,3]
this becomes
page1: {
    ids: [1,2,3],
    isFetching: true
    errorMessage: null
}
in action, before making ajax we fire the request action, so the isFetching is set to true
and then when its received, its set back to false.
top level selector is called with the entire state, which then gets the correct slice of state and calls the appropriate selector in the reducer file. this selector then lookups on the sliced state it gets.
in fetch todos, directly pass the action object for request and receive. no need to have object creators for them as they will never  be called directly. Also name the consistently like
FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST
response, message, null
Error component with message and retry button
write thunks like a curried function in one line
export const myAction = (p1, p2) => (dispatch) =>
    reutrn WebUtil.bla(pa1, pa2).
        then(response => dispatch( {type: K.t, repsonse}) )
when new entity is added/deleted the entities reducer will need to add/delete it.
also the filters setup to hold list of ids will also need to listen for it and update itself.
so page keys in pagination should also listen for delete and remove items from the key
do normalization in actions
have a schema object for array of schema object. in schema.js file.
  export const todo = new Schema("todos");
  export const arrayOfTodos = arrayOf(todo);
  use as schema.todo & schema.arrayOfTodos when doing normalization
 use spread operator to do the merge {...state, ...action.response.entities}

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Pagination

Front end should only show what it desires to.
And it should be able to ask backend to give it more data when it desires so.

so front end says show page 2 with 10 per page.
now it should only show those records even if it has more in front end store.
if it has less it needs to fetch more.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

build mime builder

Phone Number
Text box, enter text (hash tag your emotion)

http://version1.api.memegenerator.net/


## Data FLow
1. User enters `to`, `text` & `tag`.
2. We call `updateMessage`. It also calls the `Generator Search` and gets back `variousImages` which is an array of `generator ids & image ids`. Geneate Preview Urls. All this is put in the store.
3. User clicks on a generated preview. We call the image creator, get the image, send it out via twilio and say sucess to the user, while showing the latest sent image.


## SEARCH
http://version1.api.memegenerator.net/Generators_Search?q=drink&pageIndex=0&pageSize=12
{
  "success": true,
  "result": [
    {
    "generatorID": 5753832,
    "displayName": "drink",
    "urlName": "Drink",
    "totalVotesScore": 0,
    "imageUrl": "https://cdn.meme.am/images/400x/14699288.jpg",
    "instancesCount": 3,
    "ranking": 123674
    },
    {
    "generatorID": 3466964,
    "displayName": "Kermit The Frog Drinking Tea",
    "urlName": "Kermit-The-Frog-Drinking-Tea",
    "totalVotesScore": 131,
    "imageUrl": "https://cdn.meme.am/images/400x/11590722.jpg",
    "instancesCount": 277585,
    "ranking": 40
    },
    {
    "generatorID": 1230327,
    "displayName": "drunk baby 1",
    "urlName": "Drunk-Baby-1",
    "totalVotesScore": 459,
    "imageUrl": "https://cdn.meme.am/images/400x/5188389.jpg",
    "instancesCount": 114512,
    "ranking": 57
    },
    {
    "generatorID": 1120481,
    "displayName": "high/drunk guy",
    "urlName": "HighDrunk-Guy",
    "totalVotesScore": 6,
    "imageUrl": "https://cdn.meme.am/images/400x/4802831.jpg",
    "instancesCount": 14048,
    "ranking": 484
    }
  ]
}

## Preview

https://cdn.meme.am/Instance/Preview?imageID=5188389&generatorTypeID=1230327&panels=&text0=we gonna&text1=drink tonight


http://version1.api.memegenerator.net/Instance_Create?username=sandeep45&password=123Mock123!&languageCode=en&text0=sandeep%20is&text1=testingiphone&imageID=10561365&generatorID=45

{
  "success": true,
  "result": {
    "generatorID": 45,
    "displayName": "Insanity Wolf",
    "urlName": "Insanity-Wolf",
    "totalVotesScore": 0,
    "imageUrl": "https://cdn.meme.am/images/400x/10561365.jpg",
    "instanceID": 68695018,
    "text0": "sandeep is",
    "text1": "testingiphone",
    "instanceImageUrl": "https://cdn.meme.am/instances/400x/68695018.jpg",
    "instanceUrl": "http://memegenerator.net/instance/68695018"
  }
}



140 characters
split on white space after 70 characters have passed


Send via twilio

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


MessageList
This shows all messages inbound and outbound.

MessageHistory
This shows all conversations with a person
