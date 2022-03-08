import React from 'react';

export const Players = ({ players = [] }) => <table>
  <thead>
    <tr>
      <th>Player</th>
      <th>Point</th>
    </tr>
  </thead>
  <tbody>
    {
      players.map(p => <tr key={p.playerId}>
        <td>{p.name}</td>
        <td>{p.point}</td>
      </tr>)
    }
  </tbody>
</table>