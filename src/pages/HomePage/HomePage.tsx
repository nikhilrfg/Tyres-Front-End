import { useState, useEffect } from 'react';

import { createTyre, getUserTyres, deleteTyre, updateTyre } from '../../ApiServices/TyreService';

import Navbar from '../../components/Navbar/Navbar';

import './HomePage.css';
// import { createPath } from 'react-router-dom';

const HomePage = () => {
    const[newBrandValue, setNewBrandValue] = useState('');
    const[newMakeValue, setNewMakeValue] = useState('');
    const[newModelValue, setNewModelValue] = useState('');
    const[newSizeValue, setNewSizeValue] = useState('');

    const [editTyreId, setEditTyreId] = useState(null);

    const [currentBrandEditing, setCurrentBrandEditing] = useState('');
    const [currentMakeEditing, setCurrentMakeEditing] = useState('');
    const [currentModelEditing, setCurrentModelEditing] = useState('');
    const [currentSizeEditing, setCurrentSizeEditing] = useState('');

    const [tyres, setTyres] = useState([]);

    useEffect(() => {
        fetchTyres()
    }, []);

    const fetchTyres = async() =>{
        const fetchedTyres = await getUserTyres();
        // console.log('cars', fetchedCars);

        setTyres(fetchedTyres.tyres);
    }
  

    const handleCreateTyre = async() => {
        console.log ({
            newBrandValue,
            newMakeValue,
            newModelValue,
            newSizeValue
        })
        
        await createTyre({
            newBrandValue,
            newMakeValue,
            newModelValue,
            newSizeValue
        })

        fetchTyres();
    }

    const handleDeleteTyre = async (tyreId: any) => {
        await deleteTyre(tyreId);

        fetchTyres();
    }

    const handleEditTyre = (tyre: any) => {
        setCurrentBrandEditing(tyre.brand);
        setCurrentMakeEditing(tyre.make);
        setCurrentModelEditing(tyre.model);
        setCurrentSizeEditing(tyre.size);
        setEditTyreId(tyre.id);
        }

    const saveTyreChanges = (tyre: any) => {
        updateTyre({
            id: tyre.id,
            brand: currentBrandEditing,
            make: currentMakeEditing,
            model: currentModelEditing,
            size: currentSizeEditing
        });
        setEditTyreId(null);
        fetchTyres();
    }

    const renderEditSaveTyreButton = (tyre: any) => {
        if(tyre.id === editTyreId) {
            return (
                <button onClick={() => saveTyreChanges(tyre)}>Save</button>
            )
        } else {
            return (
                <button onClick={() => handleEditTyre(tyre)}>Edit</button>
            )
        }
    }

    const renderTyresList = () => {
        // console.log('tyres', tyres)
        const tyresElements: any = [];

        tyres.forEach((tyre: any, index: any) => {
            tyresElements.push(
                <div className='tyre-list-item' key={`${index}${tyre.id}`}>

                    <div className='tyre-list-item-labels'>
                        <p>Brand:</p>
                        <p>Make:</p>
                        <p>Model:</p>
                        <p>Size:</p>
                    </div>

                    {tyre.id === editTyreId ? 
                    <div className='tyre-list-item-inner-container'>
                        <input 
                            onChange={(e) => setCurrentBrandEditing(e.target.value)} className='tyre-list-item-edit'defaultValue={tyre.brand}/>
                        <input 
                            onChange={(e) => setCurrentMakeEditing(e.target.value)} className='tyre-list-item-edit'defaultValue={tyre.make}/>
                        <input 
                            onChange={(e) => setCurrentModelEditing(e.target.value)}className='tyre-list-item-edit' defaultValue={tyre.model}/>
                        <input 
                            onChange={(e) => setCurrentSizeEditing(e.target.value)}className='tyre-list-item-edit' defaultValue={tyre.size}/>
                    </div> :

                    <div className='tyre-list-item-inner-container'>
                        <p className='tyre-list-item-field'>{tyre.brand}</p>
                        <p className='tyre-list-item-field'>{tyre.make}</p>
                        <p className='tyre-list-item-field'>{tyre.model}</p>
                        <p className='tyre-list-item-field'>{tyre.size}</p>
                    </div>}
                    



                    <button onClick={() => handleDeleteTyre(tyre.id)}>Delete</button>
                    {renderEditSaveTyreButton(tyre)}

                    {/* <button onClick={() => handleEditCar(car.id)}>{car.id === editCarId? 'Save' : 'Edit'}</button> */}
                    
                    {/* {car.id === editCarId} ? <button>Save</button> : <></> */}
                </div>
            )
        })

        return tyresElements;
    }
    return (
        <div>
            <Navbar />

            <div className='content-container'>
                {/* <h1>Home</h1> */}

                <div>
                    <label htmlFor='new-tyre-brand-input'>Brand:</label>
                    <input 
                        onChange={(event: any) => setNewBrandValue(event.target.value)} 
                        id='new-tyre-brand-input' type='text' />
                </div>

                <div>
                    <label htmlFor='new-tyre-make-input'>Make:</label>
                    <input 
                        onChange={(event: any) => setNewMakeValue(event.target.value)} 
                        id='new-tyre-make-input' type='text' />
                </div>

                <div>
                    <label htmlFor='new-tyre-model-input'>Model:</label>
                        <input 
                        onChange={(event: any) => setNewModelValue(event.target.value)} id='new-tyre-model-input' type='text' />
                </div>

                <div>
                    <label htmlFor='new-tyre-size-input'>Size:</label>
                        <input 
                        onChange={(event: any) => setNewSizeValue(event.target.value)} id='new-tyre-size-input' type='text' />
                </div>

                <button onClick={handleCreateTyre}>Add Tyre</button>

                {renderTyresList()}
            </div>
        </div>
    )
}

export default HomePage;