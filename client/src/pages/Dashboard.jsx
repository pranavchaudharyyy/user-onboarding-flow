export default function Dashboard({ user, onLogout }) {
  return (
    <div style={{ maxWidth: 500, margin: '80px auto', padding: 24 }}>
      <h2>Welcome, {user.name}! 🎉</h2>
      <p style={{ color: 'gray' }}>Here's what we know about you</p>
      <hr />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {[
            ['Name',            user.name],
            ['Email',           user.email],
            ['College',         user.college],
            ['Graduation Year', user.graduation_year],
            ['Career Goal',     user.career_goal],
          ].map(([label, value]) => (
            <tr key={label}>
              <td style={{ padding: '10px 0', fontWeight: 'bold', width: '40%' }}>{label}</td>
              <td style={{ padding: '10px 0' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
}