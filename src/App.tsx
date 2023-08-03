import { ChangeEvent } from 'react';
import styles from './home.module.css'
import { IData } from './interfaces';
import { data } from './constants';
import useLocalStorage from 'use-local-storage';

const App = (): JSX.Element => {


  const [title, setTitle] = useLocalStorage<string>('title', '')
  const [arr, setArr] = useLocalStorage<IData[]>('data', data)


  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleSubmit = (): void => {
    if(!title.length) return
    const newData = {
      title: title,
      id: new Date().getTime(),
      description: 'description',
    }
    setTitle('')
    setArr([...arr, newData])
    console.log(newData);
    
  }

  const deleteItem = (id: number): void => {
    const newData = arr.filter(c => c.id != id)
    setArr(newData)
  }

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>App Todo</h1>
      <input onChange={changeHandler} value={title} type="text" placeholder='Enter your task' className={styles.input}/>
      <button onClick={handleSubmit} className={styles.button}>Add Todo</button>

      <div className={styles.card}>        
        {arr.map((c) => (
          <div className={styles.cardItem} key={c.id}>
            <p>{c.title}</p>
            <div className={styles.delete}>
              <button onClick={() => deleteItem(c.id)}>Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;