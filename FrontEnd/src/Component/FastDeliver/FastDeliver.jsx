import './FastDeliver.css';
import React from 'react'
import pizza from '../Asset/pizza.png';
import rider from '../Asset/delivery_rider.png';
import book from '../Asset/Book.png'

const FastDeliver = () => {
  return (
    <div className='fast_deliver'>
      <div className="three_col">
        <img src={pizza} alt="" />
        <h3>Gourmet cuisine</h3>
        <p>Praesentium dolores officia, voluptate nostrum ex magni quis ea ipsa voluptas itaque adipisci illum? Culpa mollitia ea dolores laborum! Expedita, laboriosam cupiditate!</p>
      </div>
      <div className="three_col">
        <img src={rider} alt="" />
        <h3>Rapid delivery</h3>
        <p>Praesentium dolores officia, voluptate nostrum ex magni quis ea ipsa voluptas itaque adipisci illum? Culpa mollitia ea dolores laborum! Expedita, laboriosam cupiditate!</p>
      </div>
      <div className="three_col">
        <img src={book} alt="" />
        <h3>Tasty recipes</h3>
        <p>Praesentium dolores officia, voluptate nostrum ex magni quis ea ipsa voluptas itaque adipisci illum? Culpa mollitia ea dolores laborum! Expedita, laboriosam cupiditate!</p>
      </div>
    </div>
  )
}

export default FastDeliver
