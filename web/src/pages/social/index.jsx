import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/joy/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NotesIcon from '@mui/icons-material/Notes';
import SendIcon from '@mui/icons-material/Send';
import RecommendIcon from '@mui/icons-material/Recommend';
import {
  Input,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  FormLabel,
} from '@mui/joy'

import {
  useState,
  useEffect
} from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

function createWithId(collection, object) {
  const ref = collection.doc()
  ref.set({...object, id: ref.id}, {merge: true})
}

const MAX_LENGTH = 768;

function ChatWindow() {
  return (<p>Chat</p>);
}

function Chat({style}) {
  return (
    <Box style={style}>
      <Stack direction="row" spacing={4}>
      {
        [1, 2, 3, 4, 5, 6].map(c => (
          <ChatWindow />
        ))
      }
      <Button sx={{position: 'relative', top: -5}}>Nový chat</Button>
      </Stack>
    </Box>
  );
}

function Social({user, firestore}) {

  const postsCol = firestore.collection('posts')
  const query = postsCol.orderBy('createdAt', 'desc')
  const [posts] = useCollectionData(query, {idField: 'id'})

  const [responseTo, setResponseTo] = useState(null)
  const post = (event) => {
    event.preventDefault();

    const form = event.target;
    const formFields = form.elements;

    const date = new Date();

    if (formFields.text.value.length > MAX_LENGTH) return;

    createWithId(postsCol, {
      text: formFields.text.value,
      datetime: `${date.getDate()}.${date.getMonth()+1}. ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, 0)}`,
      poster: user.email,
      hashtags: [],
      tagged_people: [],
      attachments: [],
      likes: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: user.uid,
      responseTo: responseTo
    })
  }

  const like = (p) => {
    postsCol.doc(p).update({likes: firebase.firestore.FieldValue.arrayUnion(user.email)})
  }

  const del = (p) => {
    postsCol.doc(p).delete()
  }

  // db: kolekce messages kde budou ulozeny zpravy
  // kazda zprava - autor.

  const newChat = (users) => {

  }

  const message = (chatId) => {

  }

  const [length, setLength] = useState(0);
  const getLengthText = (<Typography>{length}/{MAX_LENGTH}</Typography>);

  return (
    <>
    <Chat style={{zIndex: 999999, position: "fixed", right: 10, bottom: 10, alignSelf: "flex-end"}} />
    <Box>
      <Button onClick={() => setResponseTo(null)} variant="text">Zpet nahoru</Button>
      { user &&
        <Box>
          <Card sx={{margin: 'auto', width: {xs: '100%', md: '60%'}}}>
            <form onSubmit={post}>
              <CardContent sx={{display: 'inline'}}>
                <FormControl>
                  <FormLabel>
                    Text příspěvku
                  </FormLabel>
                  <Input
                    multiline
                    variant="standard"
                    name="text"
                    sx={{width: '90%'}}
                    onChange={(e) => setLength(e.target.value.length)}
                  />

                  <FormLabel>{getLengthText}</FormLabel>
                </FormControl>
              </CardContent>
              <CardActions sx={{display: 'inline', position: 'absolute', bottom: '20%', right: '3%'}}>
                <IconButton variant="contained" type="submit"><SendIcon /></IconButton>
              </CardActions>
            </form>
          </Card>
        </Box>
      }
      <br />

      {(posts && posts.length > 0) &&
        <Stack direction="column" alignItems="center">
          {(posts.filter(post => (post.responseTo == responseTo)).length > 0) ? posts.map(post => (post.responseTo == responseTo) &&
            <Box key={post.id} sx={{width: {xs: '100%', md: '60%'}}}>
              <Card>
                <Box>
                  <AccountCircle style={{display: 'inline-flex'}} />
                  <Typography style={{display: 'inline-flex', position: 'relative', top: -6.5}}>&nbsp;{post.poster}</Typography>
                  <Typography>{`${post.datetime} • ${post.likes.length} `}<RecommendIcon fontSize="small" sx={{position: 'relative', bottom: -5}} /></Typography>
                </Box>
                <CardContent onClick={() => setResponseTo(post.id)}>
                  <Typography>{post.text}</Typography>
                </CardContent>
                <CardActions>
                {user && <>
                  <IconButton onClick={() => like(post.id)}><ThumbUpIcon color={post.likes.includes(user.email) ? "primary" : "action"} /></IconButton>
                  <IconButton onClick={() => setResponseTo(post.id)}><CommentIcon /></IconButton>

                  { post.createdBy == user.uid && <>
                    <IconButton><EditIcon /></IconButton>
                    <IconButton onClick={() => del(post.id)}><DeleteIcon /></IconButton>
                  </>
                  }
                  </>
                }
                </CardActions>
              </Card>
              <br />
            </Box>
          )
          : <h3>Zadne prispevky</h3>
          }
        </Stack>
      }
    </Box>
    </>
  );
}

export default Social;
