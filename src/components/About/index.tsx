import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section>
      <Link to="/">Home</Link>
      <h2>About</h2>
      <p>Some content about this app</p>
    </section>
  );
}
