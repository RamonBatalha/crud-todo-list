import {FaEdit, FaTrash} from 'react-icons/fa'

const List = ({items, removeItem, editItem}) => {
     return (
        items.map((item)=>{
            const {id, title} = item;

            return (
                <section key={id} id="item-list-section">
                    <p>{title}</p>
                    <div>
                        <button type="button" className='btn-icon' onClick={() => editItem(id)}>
                            <FaEdit className='icons' id='icon-up'/>
                        </button>
                        <button type="button" className='btn-icon' onClick={() => removeItem(id) }>
                            <FaTrash className='icons' id='icon-dlt'/>
                        </button>
                    </div>
                </section>
            )
        })
     )
}

export default List