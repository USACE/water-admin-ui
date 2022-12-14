import { useConnect } from 'redux-bundler-hook';
import './login.css';

export default function Login() {
  const { doAuthLogin } = useConnect('doAuthLogin');

  function randomImage(images) {
    return !images.length
      ? null
      : images[Math.floor(Math.random() * images.length)];
  }

  return (
    <main className='container flex'>
      <article className='grid login'>
        <div>
          <hgroup>
            <h1>Sign in</h1>
            <h3>You will be prompted for your CAC PIN</h3>
          </hgroup>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              doAuthLogin();
            }}
          >
            <fieldset>
              <label htmlFor='remember'>
                <input
                  type='checkbox'
                  role='switch'
                  id='remember'
                  name='remember'
                />
                Remember me
              </label>
            </fieldset>
            <button type='submit' className='contrast'>
              Login
            </button>
          </form>
        </div>
        <div
          id='loginImage'
          style={{
            backgroundImage: `url(
            ${randomImage([
              'https://source.unsplash.com/tb1JFTlse20/640',
              'https://source.unsplash.com/VHzmjwAPQrc/600',
              'https://source.unsplash.com/CJTUbgI1N1s/600',
              'https://source.unsplash.com/dq3ujEmzV0s/600',
            ])})`,
          }}
        ></div>
      </article>
    </main>
  );
}
