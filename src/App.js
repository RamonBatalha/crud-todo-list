import { useState, useEffect } from 'react';
import Alert from './Alert';
import List from './List';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');

  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
   return []
  }
}


function App() {

  const [input, setInput] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});
  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      //mensagem de alerta

      setAlert({show: true, msg:"campo vazio", type:"danger"});
    } else if (input && isEditing) {
      // edit

      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: input }
          }
          return item
        })
      )

      setInput('');
      setEditId(null);
      setEditing(false)

      setAlert({show: true, msg:"item editado", type:"sucess"});
    } else {
      const newItem = { id: new Date().getTime().toString(), title: input };

      setList([...list, newItem]);

      setInput('');

      setAlert({show: true, msg:"item adicionado", type:"sucess"});

    }
  }

  //------------------- função de remoção de item -------------------- //

  const removeItem = (id) => {

    setList(list.filter((item) => item.id !== id))

    setAlert({show: true, msg:"item removido", type:"danger"});
  }

  //------------ função limpar todos os itens ---------------//

  const clearList = () => {
    setList([]);
    setAlert({show: true, msg:"lista removida", type:"danger"});
  }

  //------------ função editar item ----------------//

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);

    setEditing(true);

    setEditId(id);

    setInput(specificItem.title);
  }

  // --------------- funçaõ remover alert ------------ //

  const showAlert = (show=false, type='', msg='') => {
         setAlert({show, type, msg})
  }

  // ------------- local storage ----------------- //

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section>

      {/* //-------------------div formulário---------------- */}
      <div id="top-form">

        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
          <h3>Minha Lista</h3>
          <div id="div-input">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" className='btn' id='btn-sub'>{isEditing ? 'Editar' : 'Adicionar item'}</button>
          </div>
        </form>
        {/* //-----------------Div renderização da lista----------------- */}
        {list.length > 0 && (<div id="div-list">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='btn clear-btn' onClick={() => clearList()}>Limpar lista</button>
        </div>
        )}

      </div>
    </section>
  )
}

export default App;
