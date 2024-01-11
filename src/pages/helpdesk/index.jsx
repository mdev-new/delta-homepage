import {
	Button,
	Input,
	Stack,
	Table,
	Typography,
	FormControl,
	FormLabel,
	Select,
	MenuItem,
	Option,
	Box,
	CardContent,
	Card
} from '@mui/joy'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

function createWithId(collection, object) {
	const ref = collection.doc()
	ref.set({...object, id: ref.id}, {merge: true})
}

export default function Helpdesk({user, firestore}) {

	const problemsCol = firestore.collection('problems')
	const query = problemsCol.orderBy('createdAt', 'desc')

	const [problems] = useCollectionData(query, {idField: 'id'})

	const submit = (event) => {
		event.preventDefault();

		const form = event.target;
		const formFields = form.elements;
	
		const date = new Date();
		createWithId(problemsCol, {
			problem: formFields.problem.value,
			type: formFields.type[1].value,
			place: formFields.place.value,
			assigned: formFields.assignee.value,
			reporter: user.email,
			datetime: `${date.getDate()}.${date.getMonth()+1}. ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, 0)}`,
			state: 'waiting',
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			createdBy: user.id
		})
	}

	const del = (p) => {
		problemsCol.doc(p).delete()
	}

	const status = (p, s) => {
		problemsCol.doc(p).update({state: s})
	}

	return (<>
	{ user &&
           <form onSubmit={submit}>
             <Stack direction={{xs: 'column', lg: 'row'}} spacing={2}>
                 <FormControl>
                     <FormLabel>
                         Závada
                     </FormLabel>
                     <Input name="problem" variant="outlined" />
                 </FormControl>
                 <FormControl>
                     <FormLabel>
                         Místo
                     </FormLabel>
                     <Input name="place" variant="outlined" />
                 </FormControl>
                 <FormControl>
                     <FormLabel>
                         Přiřazená osoba (e-mail)
                     </FormLabel>
                     <Input name="assignee" variant="outlined" />
                 </FormControl>
                 <FormControl sx={{width: 120}}>
                     <FormLabel>Typ závady</FormLabel>
                     <Select
                         label="Typ závady"
                         name="type"
						defaultValue="Software"
                     >
                         <Option value="Hardware">Hardware</Option>
                         <Option value="Software">Software</Option>
                         <Option value="Ostatni">Ostatní</Option>
                     </Select>
                 </FormControl>
                 <Button type="submit" variant="outlined">Přidat</Button>
             </Stack>
           </form>
	}
	<br />

	<Box sx={{display: {xs: 'none', sm: 'block'}}}>
	<Table>
		 <thead>
			<tr>
				<th><b>Závada</b></th>
				<th><b>Typ závady</b></th>
				<th><b>Místo</b></th>
				<th><b>Datum a čas</b></th>
				<th><b>Přiřazená osoba</b></th>
				<th><b>Nahlásil</b></th>
				<th><b>Souhlasí</b></th>
			</tr>
		 </thead>
		 <tbody>
			 {problems && problems.map((post) => 
				 <tr style={(post.state == 'waiting') ? {} : (post.state == 'work') ? {backgroundColor: 'yellow'} : {color: 'white', backgroundColor: 'green'}}>
					 <td><Typography>{post.problem}</Typography></td>
					 <td><Typography>{post.type}</Typography></td>
					 <td><Typography>{post.place}</Typography></td>
					 <td><Typography>{post.datetime}</Typography></td>
					 <td><Typography>{post.assigned}</Typography></td>
					 <td><Typography>{post.reporter}</Typography></td>
					 <td><Typography>{post.liked_by}</Typography></td>
					 <td><Typography>
						 {
							 (user && user.email === post.assigned) &&
							 <>
								 <Button variant="text" onClick={() => status(post.id, 'work')}>Pracuje se na tom</Button>
								 <Button variant="text" onClick={() => status(post.id, 'done')}>Vyresit</Button>
							 </>
						 }
						 { (user && user.student === false) && <Button variant="text" onClick={() => del(post.id)}>Smazat</Button> }
					 </Typography></td>
				 </tr>
			 )}
		 </tbody>
	</Table>
	</Box>
	
	<Box sx={{display: {xs: 'block', sm: 'none'}}}>
	{problems && problems.map((post) => 
		<Card style={(post.state == 'waiting') ? {} : (post.state == 'work') ? {backgroundColor: 'yellow'} : {color: 'white', backgroundColor: 'green'}}>
		<CardContent>
		<Table>
		<tbody style={(post.state == 'waiting') ? {} : (post.state == 'work') ? {backgroundColor: 'yellow'} : {color: 'white', backgroundColor: 'green'}}>
	       	<tr><td><Typography>Problem</Typography></td><td><Typography>{post.problem}</Typography></td></tr>
	       	<tr><td><Typography>Typ</Typography></td><td><Typography>{post.type}</Typography></td></tr>
	       	<tr><td><Typography>Misto</Typography></td><td><Typography>{post.place}</Typography></td></tr>
	       	<tr><td><Typography>Datum a cas</Typography></td><td><Typography>{post.datetime}</Typography></td></tr>
	       	<tr><td><Typography>Prirazena osoba</Typography></td><td><Typography>{post.assigned}</Typography></td></tr>
	       	<tr><td><Typography>Nahlasovatel</Typography></td><td><Typography>{post.reporter}</Typography></td></tr>
	       	<tr><td><Typography>Souhlasi</Typography></td><td><Typography>{post.liked_by}</Typography></td></tr>
		</tbody>
		</Table>
	        </CardContent>
		</Card>
	)}
	<br />
	</Box>
    </>);

}
