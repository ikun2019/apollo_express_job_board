import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobMutation, jobByIdQuery } from '../lib//graphql/queries';

function CreateJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const [mutate, { loading }] = useMutation(createJobMutation);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const job = await createJob({ title, description });
    const { data } = await mutate({
      variables: {
        input: {
          title,
          description
        }
      },
      update: (cache, result) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: { id: result.data.job.id },
          data: result.data,
        })
      }
    })

    navigate(`/jobs/${data.job.id}`);
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" disabled={loading} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
