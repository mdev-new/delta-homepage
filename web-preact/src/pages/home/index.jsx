export default function Home({user}) {
	return (
		<>
		{user &&
      <h2 style={{textAlign: 'center'}}>Vitej, {userObject.name}!</h2>
    }
		<p>Hello</p>
		</>
	);
}