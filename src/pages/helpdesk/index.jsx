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
	Option
} from '@mui/joy'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

export default function Helpdesk({user, firestore}) {

	const problemsCol = firestore.collection('problems')
	const query = problemsCol.orderBy('createdAt', 'desc')

	const [problems] = useCollectionData(query, {idField: 'id'})

	const submit = (event) => {
		event.preventDefault();

		const form = event.target;
		const formFields = form.elements;
	
		const date = new Date();
		problemsCol.add({
			problem: formFields.problem.value,
			type: formFields.type[1].value,
			place: formFields.place.value,
			assigned: formFields.assignee.value,
			reporter: user.displayName,
			datetime: `${date.getDate()}.${date.getMonth()+1}. ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, 0)}`,
			state: 'waiting',
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		})
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
				 </tr>
			 )}
		 </tbody>
	</Table>
    </>);

}
