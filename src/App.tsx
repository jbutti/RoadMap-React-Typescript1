import './App.css';
import { useState, useEffect, useRef } from 'react';
import List from './components/List'
import {Sub, SubsResponseFromApi} from './interfaces/Interfaces'
import Form from './components/Form';
import axios from 'axios';

interface AppState {
  subs: Array<Sub>;
  newSubsNumbers: number;
}

const initialState =[
  {
    nick: "dapelu",
    subMonths: 4,
    avatar: "https://i.pravatar.cc/150?u=dapelu",
    description: "Dapelu is the most popular"
  },
  {
    nick: "pepe",
    subMonths: 5,
    avatar: "https://i.pravatar.cc/150?u=dape",
  }
];

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumbers"]>(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSubs(initialState);

    const fetchSubs = () : Promise<SubsResponseFromApi> => {
      return axios.get('http:localhost:3001/subs').then(res => res.data)
    }

    const mapFromApiToSubs = (apiResponse :SubsResponseFromApi): Array<Sub> =>{
      return apiResponse.map(subFromApi => {
        const{
          nick,
          month: subMonths,
          profileUrl: avatar,
          description
        } = subFromApi

        return {
          nick,
          description,
          avatar,
          subMonths
        }
      })
    }

    fetchSubs()
      .then(mapFromApiToSubs)
      .then(setSubs)
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub]); 
    setNewSubsNumber(x => x + 1 );
  }
  

  return (
    <div className="App" ref={divRef}>
      <h1>Test Subs</h1>
      <List subs={subs}/>
      New Subs: {newSubsNumber}
      <Form onNewSub={handleNewSub}/>
    </div>
  );
}

export default App;
