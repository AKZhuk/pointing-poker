import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import './App.scss';
import { setUser } from '../redux/reducers/user/userActions';

export const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser('firstName', 'vova'));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus laoreet urna nec pulvinar. Donec at
          ligula risus. Ut ut magna faucibus, maximus lectus quis, efficitur enim. Donec sit amet purus eu nunc porta
          ultrices. Mauris id eros erat. Suspendisse potenti. Donec tincidunt metus eget leo ullamcorper blandit. Donec
          ultricies venenatis purus eget volutpat. Nam quis turpis fermentum turpis commodo pharetra. Cras id
          sollicitudin arcu. Cras auctor pharetra nunc, eget congue ligula ornare in. Proin porta, risus a euismod
          imperdiet, massa lectus varius augue, vitae sodales orci augue non nulla. Phasellus leo lacus, tincidunt nec
          venenatis accumsan, placerat quis erat. Duis faucibus lacinia dignissim. Donec neque orci, iaculis a imperdiet
          eget, pellentesque nec dui. Phasellus laoreet ligula ac lacus rutrum, et egestas lorem imperdiet. Nunc ac
          massa pulvinar, rutrum nisi in, tincidunt nisi. Nam mollis lectus non est pulvinar hendrerit et id arcu.
          Phasellus eu lobortis risus. Integer euismod tempus quam id porta. Ut eu arcu posuere, fringilla ex nec,
          auctor lacus. Mauris finibus arcu ac erat condimentum, sit amet feugiat diam feugiat. Nullam eget est id metus
          tristique aliquam. Integer a efficitur enim. Pellentesque ac nibh id est pellentesque porttitor. Nulla
          facilisi. Duis accumsan, nunc nec finibus laoreet, purus sapien ornare mi, in interdum metus erat at est.
          Etiam semper massa tortor, eget consequat diam convallis vitae. Quisque nec ex vestibulum, tincidunt odio eu,
          tristique justo. Quisque viverra purus eget lorem iaculis malesuada. Nullam volutpat eros id facilisis
          posuere. Cras ultrices risus ante. Nullam tristique neque sed sapien consequat, eu placerat diam efficitur.
          Praesent a vestibulum diam. Curabitur sed augue orci. Vestibulum auctor accumsan augue, et aliquet neque
          accumsan eget. Vestibulum leo est, varius et turpis vitae, sollicitudin venenatis justo. Donec rutrum magna
          eget neque suscipit, sit amet accumsan nisi pretium. Nam imperdiet justo sit amet justo blandit pretium. Nulla
          vel purus ac enim scelerisque ullamcorper nec eu mauris. Mauris non ultricies lectus. Aliquam rutrum quis
          neque in maximus. Nam venenatis eros vitae consequat mattis. Curabitur ultrices nulla erat, ac porttitor dui
          vestibulum eu. Nulla eget enim orci. Mauris dapibus posuere purus eu commodo. Sed vitae sem a massa aliquam
          pulvinar a ac massa. Sed fringilla quis orci vitae molestie. Nam placerat arcu diam, consectetur vehicula
          metus tempus vitae. Pellentesque ut vulputate ipsum, in placerat tellus. Sed convallis arcu nec orci sagittis
          feugiat. Sed nec scelerisque tortor, a sodales sapien. Proin sit amet neque sed est porttitor tincidunt non
          vitae ante. Nam aliquam in tellus id molestie. Phasellus dignissim diam in quam porta, nec luctus lacus
          elementum. Duis vitae nisi ligula. Etiam sodales, lacus vitae fringilla dignissim, magna ante porta orci, ac
          egestas est ligula vel purus.
        </p>
      </main>
      <Footer />
    </div>
  );
};
