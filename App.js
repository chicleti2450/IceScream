
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CORES = {
  fundo: '#080808',
  vermelho: '#E31837',
  vinho: '#650D1B',
  branco: '#FFFFFF',
  cinza: '#A6A6A6',
  campo: '#171717',
};

function Logo() {
  return (
    <View style={estilos.logoContainer}>
      <Text style={estilos.logoIce}>ICE</Text>
      <Text style={estilos.logoScream}>SCREAM</Text>
      <Text style={estilos.subtituloLogo}>
        O sabor do seu pior pesadelo.
      </Text>
    </View>
  );
}

function Campo({
  titulo,
  valor,
  alterar,
  placeholder,
  senha = false,
  teclado = 'default',
}) {
  return (
    <View style={estilos.grupoCampo}>
      <Text style={estilos.rotulo}>{titulo}</Text>
      <TextInput
        style={estilos.input}
        value={valor}
        onChangeText={alterar}
        placeholder={placeholder}
        placeholderTextColor="#777777"
        secureTextEntry={senha}
        keyboardType={teclado}
        autoCapitalize={teclado === 'email-address' ? 'none' : 'sentences'}
        autoCorrect={false}
        selectionColor={CORES.vermelho}
      />
    </View>
  );
}

function Botao({ titulo, aoPressionar, secundario = false }) {
  return (
    <TouchableOpacity
      style={[
        estilos.botao,
        secundario && estilos.botaoSecundario,
      ]}
      onPress={aoPressionar}
      activeOpacity={0.8}
    >
      <Text
        style={[
          estilos.textoBotao,
          secundario && estilos.textoBotaoSecundario,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

function LoginScreen({ navigation, account, onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    if (
      !account ||
      account.email.toLowerCase() !== email.trim().toLowerCase() ||
      account.senha !== senha
    ) {
      Alert.alert(
        'Não foi possível entrar',
        'Confira seus dados ou faça seu cadastro.'
      );
      return;
    }

    onLogin(account);
  }

  return (
    <KeyboardAvoidingView
      style={estilos.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={estilos.conteudoLogin}
        keyboardShouldPersistTaps="handled"
      >
        <Logo />

        <Text style={estilos.titulo}>
          ENTRE SE PUDER
        </Text>
        <Text style={estilos.descricao}>
          Seu próximo pesadelo tem sabor.
        </Text>

        <View style={estilos.formulario}>
          <Campo
            titulo="E-mail"
            valor={email}
            alterar={setEmail}
            placeholder="Digite seu e-mail"
            teclado="email-address"
          />

          <Campo
            titulo="Senha"
            valor={senha}
            alterar={setSenha}
            placeholder="Digite sua senha"
            senha
          />

          <Botao titulo="ENTRAR" aoPressionar={entrar} />

          <Botao
            titulo="CRIAR CONTA"
            secundario
            aoPressionar={() => navigation.navigate('Cadastro')}
          />
        </View>

        <Text style={estilos.rodape}>
          ICE SCREAM · UMA EXPERIÊNCIA DE TERROR
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function CadastroScreen({ navigation, onRegister }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [telefone, setTelefone] = useState('');

  function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha || !confirmacao) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email.trim())) {
      Alert.alert('E-mail inválido', 'Digite um endereço de e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Senha inválida', 'Use pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmacao) {
      Alert.alert('Senhas diferentes', 'As senhas precisam ser iguais.');
      return;
    }

    onRegister({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha,
      telefone: telefone.trim(),
    });
  }

  return (
    <KeyboardAvoidingView
      style={estilos.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={estilos.conteudoCadastro}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={estilos.voltar}
        >
          <Text style={estilos.textoVoltar}>‹  VOLTAR</Text>
        </TouchableOpacity>

        <Text style={estilos.tituloCadastro}>CADASTRO</Text>
        <Text style={estilos.descricao}>
          Faça parte desta experiência sombria.
        </Text>

        <Campo
          titulo="Nome completo *"
          valor={nome}
          alterar={setNome}
          placeholder="Seu nome"
        />

        <Campo
          titulo="E-mail *"
          valor={email}
          alterar={setEmail}
          placeholder="seuemail@exemplo.com"
          teclado="email-address"
        />

        <Campo
          titulo="Senha *"
          valor={senha}
          alterar={setSenha}
          placeholder="Mínimo de 6 caracteres"
          senha
        />

        <Campo
          titulo="Confirmar senha *"
          valor={confirmacao}
          alterar={setConfirmacao}
          placeholder="Digite a senha novamente"
          senha
        />

        <Campo
          titulo="Telefone"
          valor={telefone}
          alterar={setTelefone}
          placeholder="(00) 00000-0000"
          teclado="phone-pad"
        />

        <Botao titulo="CADASTRAR" aoPressionar={cadastrar} />

        <Text style={estilos.aviso}>
          * Campos obrigatórios.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Cabecalho({ titulo, navigation }) {
  function abrirMenu() {
    const pai = navigation.getParent();

    if (pai?.openDrawer) {
      pai.openDrawer();
    } else if (navigation.openDrawer) {
      navigation.openDrawer();
    }
  }

  return (
    <View style={estilos.cabecalho}>
      <TouchableOpacity
        onPress={abrirMenu}
        style={estilos.botaoMenu}
        accessibilityLabel="Abrir menu"
      >
        <Text style={estilos.iconeMenu}>☰</Text>
      </TouchableOpacity>

      <Text style={estilos.logoPequeno}>
        ICE <Text style={{ color: CORES.vermelho }}>SCREAM</Text>
      </Text>

      <Text style={estilos.tituloCabecalho}>{titulo}</Text>
    </View>
  );
}

function Pagina({ navigation, titulo, descricao, children }) {
  return (
    <View style={estilos.tela}>
      <Cabecalho titulo={titulo} navigation={navigation} />
      <ScrollView contentContainerStyle={estilos.conteudoPagina}>
        <Text style={estilos.tituloPagina}>{titulo}</Text>
        <Text style={estilos.descricaoPagina}>{descricao}</Text>
        {children}
      </ScrollView>
    </View>
  );
}

function InicioScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Início"
      descricao="Prepare-se para experimentar sabores de outro mundo."
    >
      <View style={estilos.banner}>
        <Text style={estilos.bannerPequeno}>BEM-VINDO À</Text>
        <Text style={estilos.bannerTitulo}>ICE SCREAM</Text>
        <Text style={estilos.bannerTexto}>
          Sorvetes inspirados no universo do terror.
        </Text>
        <Text style={estilos.aviso}>
          Nosso catálogo será adicionado na próxima etapa.
        </Text>
      </View>
    </Pagina>
  );
}

function CarrinhoScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Carrinho"
      descricao="Seus sabores selecionados aparecerão aqui."
    >
      <Text style={estilos.textoVazio}>🍦</Text>
      <Text style={estilos.textoCentralizado}>
        Seu carrinho ainda está vazio.
      </Text>
    </Pagina>
  );
}

function AjudaScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Ajuda"
      descricao="Estamos aqui para ajudar."
    >
      <View style={estilos.cartao}>
        <Text style={estilos.rotulo}>Como faço um pedido?</Text>
        <Text style={estilos.descricao}>
          Em breve você poderá escolher seus sorvetes, adicionar ao carrinho
          e finalizar a compra pelo aplicativo.
        </Text>
      </View>

      <View style={estilos.cartao}>
        <Text style={estilos.rotulo}>Preciso de atendimento</Text>
        <Text style={estilos.descricao}>
          O canal de atendimento será configurado nas próximas etapas.
        </Text>
      </View>
    </Pagina>
  );
}

function PerfilScreen({ navigation, user, onLogout }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Meu perfil"
      descricao="Seus dados de demonstração."
    >
      <View style={estilos.cartao}>
        <Text style={estilos.rotulo}>Nome</Text>
        <Text style={estilos.descricao}>{user.nome}</Text>

        <Text style={estilos.rotulo}>E-mail</Text>
        <Text style={estilos.descricao}>{user.email}</Text>

        <Text style={estilos.rotulo}>Telefone</Text>
        <Text style={estilos.descricao}>
          {user.telefone || 'Não informado'}
        </Text>
      </View>

      <Botao
        titulo="SAIR DA CONTA"
        secundario
        aoPressionar={() =>
          Alert.alert('Sair da conta', 'Deseja realmente sair?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', onPress: onLogout },
          ])
        }
      />
    </Pagina>
  );
}

function PedidosScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Meus pedidos"
      descricao="Aqui ficará o histórico de compras confirmadas."
    >
      <Text style={estilos.textoCentralizado}>
        Você ainda não tem pedidos registrados.
      </Text>
    </Pagina>
  );
}

function EnderecosScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Endereços"
      descricao="Seus endereços de entrega serão exibidos aqui."
    >
      <Text style={estilos.textoCentralizado}>
        Nenhum endereço cadastrado.
      </Text>
    </Pagina>
  );
}

function AcompanharScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Acompanhar pedido"
      descricao="Consulte o andamento de suas compras."
    >
      <Text style={estilos.textoCentralizado}>
        Nenhum pedido disponível para acompanhamento.
      </Text>
    </Pagina>
  );
}

function LojaTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: CORES.vermelho,
        tabBarInactiveTintColor: CORES.cinza,
        tabBarStyle: {
          backgroundColor: CORES.fundo,
          borderTopColor: CORES.vinho,
          height: 62,
          paddingBottom: 7,
          paddingTop: 6,
        },
        sceneStyle: { backgroundColor: CORES.fundo },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
        options={{ title: 'Início', tabBarLabel: 'Início', tabBarIcon: () => <Text style={estilos.iconeTab}>⌂</Text> }}
      />
      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{ tabBarLabel: 'Carrinho', tabBarIcon: () => <Text style={estilos.iconeTab}>🛒</Text> }}
      />
      <Tab.Screen
        name="Ajuda"
        component={AjudaScreen}
        options={{ tabBarLabel: 'Ajuda', tabBarIcon: () => <Text style={estilos.iconeTab}>?</Text> }}
      />
    </Tab.Navigator>
  );
}

function PrincipalDrawer({ user, onLogout }) {
  return (
    <Drawer.Navigator
      initialRouteName="Loja"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: CORES.fundo, width: 285 },
        drawerActiveTintColor: CORES.branco,
        drawerInactiveTintColor: CORES.cinza,
        drawerActiveBackgroundColor: CORES.vinho,
        drawerLabelStyle: { fontSize: 15 },
        sceneStyle: { backgroundColor: CORES.fundo },
      }}
    >
      <Drawer.Screen
        name="Loja"
        component={LojaTabs}
        options={{ title: 'Início', drawerLabel: 'Início' }}
      />

      <Drawer.Screen
        name="Meu perfil"
        options={{ title: 'Meu perfil', drawerLabel: 'Meu perfil' }}
      >
        {(props) => (
          <PerfilScreen {...props} user={user} onLogout={onLogout} />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Meus pedidos"
        component={PedidosScreen}
        options={{ drawerLabel: 'Meus pedidos' }}
      />

      <Drawer.Screen
        name="Acompanhar pedido"
        component={AcompanharScreen}
        options={{ drawerLabel: 'Acompanhar pedido' }}
      />

      <Drawer.Screen
        name="Endereços"
        component={EnderecosScreen}
        options={{ drawerLabel: 'Endereços' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);

  function registrar(dados) {
    if (account && account.email === dados.email) {
      Alert.alert('Atenção', 'Este e-mail já foi cadastrado.');
      return;
    }

    setAccount(dados);

    Alert.alert(
      'Cadastro realizado!',
      'Sua conta de demonstração foi criada. Agora você pode entrar.',
      [{ text: 'Ir para o login', onPress: () => {} }]
    );
  }

  function sair(navigation) {
    setUser(null);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={CORES.fundo} />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: CORES.fundo },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                account={account}
                onLogin={(dados) => {
                  setUser(dados);
                  props.navigation.replace('Principal');
                }}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Cadastro">
            {(props) => (
              <CadastroScreen
                {...props}
                onRegister={(dados) => {
                  if (account && account.email === dados.email) {
                    Alert.alert('Atenção', 'Este e-mail já foi cadastrado.');
                    return;
                  }

                  setAccount(dados);

                  Alert.alert(
                    'Cadastro realizado!',
                    'Sua conta foi criada nesta sessão. Faça login para continuar.',
                    [{
                      text: 'Ir para o login',
                      onPress: () => props.navigation.goBack(),
                    }]
                  );
                }}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Principal">
            {(props) => (
              <PrincipalDrawer
                {...props}
                user={user}
                onLogout={() => {
                  setUser(null);
                  props.navigation.replace('Login');
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudoLogin: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 35,
  },
  conteudoCadastro: {
    paddingHorizontal: 25,
    paddingTop: 22,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 38,
  },
  logoIce: {
    color: CORES.branco,
    fontSize: 53,
    fontWeight: '900',
    letterSpacing: 9,
    textShadowColor: '#777777',
    textShadowRadius: 12,
  },
  logoScream: {
    color: CORES.vermelho,
    fontSize: 39,
    fontWeight: '900',
    letterSpacing: 5,
    textShadowColor: CORES.vermelho,
    textShadowRadius: 16,
  },
  subtituloLogo: {
    color: CORES.cinza,
    fontSize: 11,
    letterSpacing: 1.5,
    marginTop: 12,
  },
  titulo: {
    color: CORES.branco,
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 2,
  },
  tituloCadastro: {
    color: CORES.vermelho,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 18,
    marginBottom: 8,
    textShadowColor: CORES.vermelho,
    textShadowRadius: 12,
  },
  descricao: {
    color: CORES.cinza,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 20,
  },
  formulario: {
    marginTop: 25,
  },
  grupoCampo: {
    marginBottom: 18,
  },
  rotulo: {
    color: CORES.branco,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 9,
  },
  input: {
    backgroundColor: CORES.campo,
    color: CORES.branco,
    borderWidth: 1,
    borderColor: '#393939',
    borderRadius: 9,
    minHeight: 51,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  botao: {
    backgroundColor: CORES.vermelho,
    minHeight: 52,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingHorizontal: 15,
  },
  textoBotao: {
    color: CORES.branco,
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1,
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: CORES.vermelho,
  },
  textoBotaoSecundario: {
    color: CORES.branco,
  },
  rodape: {
    color: '#777777',
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: 1.4,
    marginTop: 35,
  },
  voltar: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingRight: 20,
  },
  textoVoltar: {
    color: CORES.branco,
    fontSize: 15,
  },
  aviso: {
    color: CORES.cinza,
    fontSize: 12,
    marginTop: 16,
  },
  cabecalho: {
    minHeight: 65,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: CORES.vinho,
  },
  botaoMenu: {
    padding: 9,
    marginRight: 8,
  },
  iconeMenu: {
    color: CORES.branco,
    fontSize: 23,
  },
  logoPequeno: {
    color: CORES.branco,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  tituloCabecalho: {
    color: CORES.cinza,
    fontSize: 12,
    marginLeft: 'auto',
  },
  conteudoPagina: {
    padding: 22,
    paddingBottom: 40,
  },
  tituloPagina: {
    color: CORES.vermelho,
    fontSize: 27,
    fontWeight: '900',
    marginBottom: 5,
  },
  descricaoPagina: {
    color: CORES.cinza,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 25,
  },
  banner: {
    backgroundColor: '#18090C',
    borderWidth: 1,
    borderColor: CORES.vinho,
    borderRadius: 14,
    padding: 22,
    minHeight: 210,
    justifyContent: 'center',
  },
  bannerPequeno: {
    color: CORES.cinza,
    fontSize: 11,
    letterSpacing: 3,
  },
  bannerTitulo: {
    color: CORES.vermelho,
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 8,
  },
  bannerTexto: {
    color: CORES.branco,
    fontSize: 15,
    lineHeight: 22,
  },
  cartao: {
    backgroundColor: CORES.campo,
    borderWidth: 1,
    borderColor: '#393939',
    borderRadius: 10,
    padding: 17,
    marginBottom: 15,
  },
  textoVazio: {
    fontSize: 55,
    textAlign: 'center',
    marginTop: 35,
  },
  textoCentralizado: {
    color: CORES.cinza,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 18,
  },
  iconeTab: {
    color: CORES.branco,
    fontSize: 20,
  },
});

