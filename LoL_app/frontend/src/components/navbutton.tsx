import { useNavigate } from 'react-router-dom'      

export default function LinkButton(props:any) {
  const navigate = useNavigate()
  return (
      <button onClick={() => navigate(props.route)}>
        {props.label}
      </button>
  );
}
