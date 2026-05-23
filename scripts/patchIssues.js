const token = 'quoZJpaQlHD6wD7lucz63yREU6RPfp3zkt0Y6h4iChV';
const images = [
  'https://i.pinimg.com/736x/bf/3c/68/bf3c686ac159a1433f4f2909b84e12ec.jpg',
  'https://i.pinimg.com/736x/b3/79/44/b37944309e1d599937838516716d0c82.jpg',
];

async function main(){
  try{
    const r = await fetch('http://localhost:5000/api/issues?scope=public');
    if(!r.ok) throw new Error(`GET failed ${r.status}`);
    const data = await r.json();
    const issues = data.issues || [];
    if(issues.length === 0){
      console.log('No public issues found');
      return;
    }
    issues.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    const top = issues.slice(0,2);
    for(let i=0;i<top.length;i++){
      const id = top[i]._id;
      const img = images[i];
      const res = await fetch(`http://localhost:5000/api/issues/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ image: img }),
      });
      const j = await res.json();
      console.log('PATCH', id, res.status, JSON.stringify(j));
    }
  }catch(err){
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
