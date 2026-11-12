
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
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

// PRODUTOS DEMONSTRATIVOS

const PRODUTOS = [
  {
    id: '1',
    nome: 'Vampire Kiss',
    personagem: 'Vampiros',
    categoria: 'Desaparecidos',
    sabor: 'Frutas vermelhas',
    descricao: 'Sorvete de frutas vermelhas com sabor intenso.',
    preco: 18.90,
    emoji: '🍓',
    disponivel: true,
  },
  {
    id: '2',
    nome: 'Frankenstein Mint',
    personagem: 'Frankenstein',
    categoria: 'Clássicos',
    sabor: 'Menta com chocolate',
    descricao: 'Sorvete refrescante de menta com chocolate.',
    preco: 21.90,
    emoji: '🍃',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Nightmare Cookie',
    personagem: 'Pesadelos',
    categoria: 'Especiais',
    sabor: 'Baunilha com biscoitos',
    descricao: 'Baunilha cremosa com pedaços de biscoito.',
    preco: 19.90,
    emoji: '🍪',
    disponivel: true,
  },
  {
    id: '4',
    nome: 'Black Lagoon',
    personagem: 'Criaturas das profundezas',
    categoria: 'Especiais',
    sabor: 'Chocolate intenso',
    descricao: 'Sorvete de chocolate intenso e cremoso.',
    preco: 22.90,
    emoji: '🍫',
    disponivel: true,
  },
  {
    id: '5',
    nome: 'Pumpkin Terror',
    personagem: 'Halloween',
    categoria: 'Promoções',
    sabor: 'Abóbora com especiarias',
    descricao: 'Abóbora com canela e especiarias.',
    preco: 16.90,
    emoji: '🎃',
    disponivel: false,
  },
  {
    id: '6',
    nome: 'Ghost Vanilla',
    personagem: 'Fantasmas',
    categoria: 'Clássicos',
    sabor: 'Baunilha',
    descricao: 'Sorvete tradicional de baunilha.',
    preco: 16.90,
    emoji: '👻',
    disponivel: true,
  },
];

const CATEGORIAS = [
  'Todos',
  'Desaparecidos',
  'Clássicos',
  'Especiais',
  'Promoções',
];

// LOGOTIPO

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

// CAMPO DE TEXTO

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
        autoCapitalize={
          teclado === 'email-address' ? 'none' : 'sentences'
        }
        autoCorrect={false}
        selectionColor={CORES.vermelho}
      />
    </View>
  );
}

// BOTÃO

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

// LOGIN

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

        <Text style={estilos.titulo}>ENTRE SE PUDER</Text>

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

// CADASTRO

function CadastroScreen({ navigation, onRegister }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [telefone, setTelefone] = useState('');

  function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha || !confirmacao) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios.');
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email.trim())) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
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
          <Text style={estilos.textoVoltar}>‹ VOLTAR</Text>
        </TouchableOpacity>

        <Text style={estilos.tituloCadastro}>CADASTRO</Text>

        <Text style={estilos.descricao}>
          Faça parte desta experiência sombria.
        </Text>

        <Campo titulo="Nome completo *" valor={nome} alterar={setNome} placeholder="Seu nome" />

        <Campo titulo="E-mail *" valor={email} alterar={setEmail} placeholder="seuemail@exemplo.com" teclado="email-address" />

        <Campo titulo="Senha *" valor={senha} alterar={setSenha} placeholder="Mínimo de 6 caracteres" senha />

        <Campo titulo="Confirmar senha *" valor={confirmacao} alterar={setConfirmacao} placeholder="Digite novamente" senha />

        <Campo titulo="Telefone" valor={telefone} alterar={setTelefone} placeholder="(00) 00000-0000" teclado="phone-pad" />

        <Botao titulo="CADASTRAR" aoPressionar={cadastrar} />

        <Text style={estilos.aviso}>* Campos obrigatórios.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// CABEÇALHO DAS TELAS INTERNAS

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

// TELA INICIAL

function InicioScreen({ navigation }) {
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const produtosFiltrados = PRODUTOS.filter((produto) => {
    const correspondeNome = produto.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase().trim());

    const correspondeCategoria =
      categoriaAtiva === 'Todos' ||
      produto.categoria === categoriaAtiva;

    return correspondeNome && correspondeCategoria;
  });

  function abrirPerfil() {
    navigation.getParent()?.navigate('Meu perfil');
  }

  function abrirMenu() {
    navigation.getParent()?.openDrawer();
  }

  function abrirProduto(produto) {
    Alert.alert(
      produto.nome,
      `${produto.descricao}\n\nSabor: ${produto.sabor}\nPreço: R$ ${produto.preco.toFixed(2).replace('.', ',')}\n\n${produto.disponivel ? 'Disponível para compra.' : 'Produto indisponível no momento.'}`
    );
  }

  function montarSorvete() {
    navigation.getParent()?.navigate('Montar meu sorvete');
  }

  function renderProduto({ item }) {
    return (
      <TouchableOpacity
        style={estilos.cartaoProduto}
        onPress={() => abrirProduto(item)}
        activeOpacity={0.85}
      >
        <View style={estilos.imagemProduto}>
          <Text style={estilos.emojiProduto}>{item.emoji}</Text>
        </View>

        <Text style={estilos.nomeProduto}>{item.nome}</Text>

        <Text style={estilos.personagemProduto}>
          {item.personagem}
        </Text>

        <Text style={estilos.saborProduto}>
          {item.sabor}
        </Text>

        <Text style={estilos.precoProduto}>
          R$ {item.preco.toFixed(2).replace('.', ',')}
        </Text>

        {!item.disponivel && (
          <Text style={estilos.indisponivel}>
            ESGOTADO
          </Text>
        )}

        {item.disponivel && (
          <Text style={estilos.verDetalhes}>
            VER DETALHES →
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={estilos.tela}>
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        numColumns={2}
        columnWrapperStyle={estilos.linhaProdutos}
        contentContainerStyle={estilos.listaProdutos}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            {/* TOPO */}

            <View style={estilos.topoInicio}>
              <TouchableOpacity
                style={estilos.botaoMenu}
                onPress={abrirMenu}
              >
                <Text style={estilos.iconeMenu}>☰</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.botaoPerfil}
                onPress={abrirPerfil}
                accessibilityLabel="Abrir perfil"
              >
                <Text style={estilos.iconePerfil}>●</Text>
              </TouchableOpacity>
            </View>

            {/* LOGO CENTRALIZADA */}

            <View style={estilos.logoImagemContainer}>
              <Image
                source={require('./assets/logo.png')}
                style={estilos.logoImagem}
                resizeMode="contain"
              />
            </View>

            {/* PESQUISA */}

            <View style={estilos.pesquisaContainer}>
              <Text style={estilos.iconePesquisa}>⌕</Text>

              <TextInput
                style={estilos.inputPesquisa}
                placeholder="Pesquisar pelo nome do sorvete..."
                placeholderTextColor="#888888"
                value={pesquisa}
                onChangeText={setPesquisa}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {pesquisa.length > 0 && (
                <TouchableOpacity
                  onPress={() => setPesquisa('')}
                >
                  <Text style={estilos.limparPesquisa}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* CATEGORIAS */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={estilos.listaCategorias}
            >
              {CATEGORIAS.map((categoria) => {
                const ativa = categoriaAtiva === categoria;

                return (
                  <TouchableOpacity
                    key={categoria}
                    onPress={() => setCategoriaAtiva(categoria)}
                    style={[
                      estilos.categoria,
                      ativa && estilos.categoriaAtiva,
                    ]}
                  >
                    <Text
                      style={[
                        estilos.textoCategoria,
                        ativa && estilos.textoCategoriaAtiva,
                      ]}
                    >
                      {categoria}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* BOTÃO MONTAR SORVETE */}

            <TouchableOpacity
              style={estilos.botaoMontar}
              onPress={montarSorvete}
              activeOpacity={0.85}
            >
              <Text style={estilos.iconeMontar}>🍦</Text>

              <View style={estilos.textosMontar}>
                <Text style={estilos.textoMontar}>
                  MONTE SEU SORVETE
                </Text>

                <Text style={estilos.subtextoMontar}>
                  Crie uma combinação do seu jeito.
                </Text>
              </View>

              <Text style={estilos.setaMontar}>›</Text>
            </TouchableOpacity>

            {/* TÍTULO DO CATÁLOGO */}

            <View style={estilos.tituloCatalogoContainer}>
              <Text style={estilos.tituloCatalogo}>
                {pesquisa ? 'RESULTADOS' : 'NOSSOS SORVETES'}
              </Text>

              <Text style={estilos.quantidadeProdutos}>
                {produtosFiltrados.length} produtos
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={estilos.semResultados}>
            <Text style={estilos.emojiVazio}>🍦</Text>

            <Text style={estilos.textoSemResultados}>
              Nenhum sorvete encontrado.
            </Text>

            <Text style={estilos.descricaoSemResultados}>
              Tente pesquisar outro nome ou selecionar outra categoria.
            </Text>
          </View>
        }
      />
    </View>
  );
}

// MONTAR MEU SORVETE

function MontarSorveteScreen({ navigation }) {
  const [base, setBase] = useState('');
  const [cobertura, setCobertura] = useState('');
  const [adicional, setAdicional] = useState('');

  function opcao(titulo, valor, alterar) {
    const selecionado = valor === titulo;

    return (
      <TouchableOpacity
        key={titulo}
        style={[
          estilos.opcaoMontagem,
          selecionado && estilos.opcaoSelecionada,
        ]}
        onPress={() => alterar(titulo)}
      >
        <Text
          style={[
            estilos.textoOpcao,
            selecionado && estilos.textoOpcaoSelecionada,
          ]}
        >
          {selecionado ? '✓ ' : ''}
          {titulo}
        </Text>
      </TouchableOpacity>
    );
  }

  function confirmarMontagem() {
    if (!base || !cobertura) {
      Alert.alert(
        'Falta escolher',
        'Escolha pelo menos uma base e uma cobertura.'
      );
      return;
    }

    Alert.alert(
      'Sua criação está pronta!',
      `Base: ${base}\nCobertura: ${cobertura}\nAdicional: ${adicional || 'Nenhum'}\n\nA integração com o carrinho será feita na próxima etapa.`
    );
  }

  return (
    <Pagina
      navigation={navigation}
      titulo="Monte seu sorvete"
      descricao="Crie sua própria combinação."
    >
      <Text style={estilos.tituloOpcao}>1. Escolha sua base</Text>

      {['Baunilha', 'Chocolate', 'Morango', 'Menta'].map((item) =>
        opcao(item, base, setBase)
      )}

      <Text style={estilos.tituloOpcao}>2. Escolha sua cobertura</Text>

      {['Chocolate', 'Morango', 'Caramelo', 'Frutas vermelhas'].map((item) =>
        opcao(item, cobertura, setCobertura)
      )}

      <Text style={estilos.tituloOpcao}>3. Escolha um adicional</Text>

      {['Biscoito', 'Granulado', 'Castanhas', 'Sem adicional'].map((item) =>
        opcao(item, adicional, setAdicional)
      )}

      <Botao
        titulo="CONFIRMAR MINHA CRIAÇÃO"
        aoPressionar={confirmarMontagem}
      />
    </Pagina>
  );
}

// CARRINHO

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

// AJUDA

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
          Escolha seus sorvetes, adicione ao carrinho e finalize sua compra.
        </Text>
      </View>

      <View style={estilos.cartao}>
        <Text style={estilos.rotulo}>Preciso de atendimento</Text>

        <Text style={estilos.descricao}>
          Nosso canal de atendimento será configurado nas próximas etapas.
        </Text>
      </View>
    </Pagina>
  );
}

// PERFIL

function PerfilScreen({ navigation, user, onLogout }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Meu perfil"
      descricao="Seus dados de usuário."
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

// PEDIDOS

function PedidosScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Meus pedidos"
      descricao="Histórico das suas compras."
    >
      <Text style={estilos.textoCentralizado}>
        Você ainda não tem pedidos registrados.
      </Text>
    </Pagina>
  );
}

// ENDEREÇOS

function EnderecosScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Endereços"
      descricao="Seus endereços de entrega."
    >
      <Text style={estilos.textoCentralizado}>
        Nenhum endereço cadastrado.
      </Text>
    </Pagina>
  );
}

// ACOMPANHAMENTO

function AcompanharScreen({ navigation }) {
  return (
    <Pagina
      navigation={navigation}
      titulo="Acompanhar pedido"
      descricao="Consulte suas compras."
    >
      <Text style={estilos.textoCentralizado}>
        Nenhum pedido disponível para acompanhamento.
      </Text>
    </Pagina>
  );
}

// NAVEGAÇÃO INFERIOR

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
        sceneStyle: {
          backgroundColor: CORES.fundo,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          title: 'Início',
          tabBarLabel: 'Início',
          tabBarIcon: () => (
            <Text style={estilos.iconeTab}>⌂</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{
          tabBarLabel: 'Carrinho',
          tabBarIcon: () => (
            <Text style={estilos.iconeTab}>🛒</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Ajuda"
        component={AjudaScreen}
        options={{
          tabBarLabel: 'Ajuda',
          tabBarIcon: () => (
            <Text style={estilos.iconeTab}>?</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// MENU LATERAL

function PrincipalDrawer({ user, onLogout }) {
  return (
    <Drawer.Navigator
      initialRouteName="Loja"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: CORES.fundo,
          width: 285,
        },
        drawerActiveTintColor: CORES.branco,
        drawerInactiveTintColor: CORES.cinza,
        drawerActiveBackgroundColor: CORES.vinho,
        drawerLabelStyle: {
          fontSize: 15,
        },
        sceneStyle: {
          backgroundColor: CORES.fundo,
        },
      }}
    >
      <Drawer.Screen
        name="Loja"
        component={LojaTabs}
        options={{
          title: 'Início',
          drawerLabel: 'Início',
        }}
      />

      <Drawer.Screen
        name="Montar meu sorvete"
        component={MontarSorveteScreen}
        options={{
          drawerLabel: 'Montar meu sorvete',
        }}
      />

      <Drawer.Screen
        name="Meu perfil"
        options={{
          drawerLabel: 'Meu perfil',
        }}
      >
        {(props) => (
          <PerfilScreen
            {...props}
            user={user}
            onLogout={onLogout}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Meus pedidos"
        component={PedidosScreen}
        options={{
          drawerLabel: 'Meus pedidos',
        }}
      />

      <Drawer.Screen
        name="Acompanhar pedido"
        component={AcompanharScreen}
        options={{
          drawerLabel: 'Acompanhar pedido',
        }}
      />

      <Drawer.Screen
        name="Endereços"
        component={EnderecosScreen}
        options={{
          drawerLabel: 'Endereços',
        }}
      />
    </Drawer.Navigator>
  );
}

// APLICATIVO

export default function App() {
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={CORES.fundo}
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: CORES.fundo,
            },
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
                  if (
                    account &&
                    account.email.toLowerCase() === dados.email.toLowerCase()
                  ) {
                    Alert.alert(
                      'Atenção',
                      'Este e-mail já foi cadastrado.'
                    );
                    return;
                  }

                  setAccount(dados);
                  props.navigation.goBack();

                  Alert.alert(
                    'Cadastro realizado!',
                    'Sua conta foi criada. Agora você pode entrar.'
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

// ESTILOS

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

  // TELA INICIAL

  topoInicio: {
    height: 58,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  botaoPerfil: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: CORES.vinho,
    borderWidth: 1,
    borderColor: CORES.vermelho,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconePerfil: {
    color: CORES.branco,
    fontSize: 20,
  },

  logoImagemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 8,
    paddingBottom: 18,
  },

  logoImagem: {
    width: '100%',
    maxWidth: 350,
    height: 155,
  },

  pesquisaContainer: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: CORES.campo,
    borderWidth: 1,
    borderColor: CORES.vinho,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  iconePesquisa: {
    color: CORES.cinza,
    fontSize: 27,
    marginRight: 10,
  },

  inputPesquisa: {
    flex: 1,
    color: CORES.branco,
    fontSize: 14,
    height: '100%',
  },

  limparPesquisa: {
    color: CORES.cinza,
    fontSize: 18,
    paddingHorizontal: 5,
  },

  listaCategorias: {
    paddingHorizontal: 15,
    paddingTop: 23,
    paddingBottom: 20,
    gap: 9,
  },

  categoria: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#393939',
    backgroundColor: CORES.campo,
  },

  categoriaAtiva: {
    backgroundColor: CORES.vermelho,
    borderColor: CORES.vermelho,
  },

  textoCategoria: {
    color: CORES.cinza,
    fontSize: 12,
    fontWeight: '600',
  },

  textoCategoriaAtiva: {
    color: CORES.branco,
    fontWeight: '900',
  },

  botaoMontar: {
    backgroundColor: CORES.vermelho,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 17,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF526B',
  },

  iconeMontar: {
    fontSize: 29,
    marginRight: 13,
  },

  textosMontar: {
    flex: 1,
  },

  textoMontar: {
    color: CORES.branco,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },

  subtextoMontar: {
    color: '#FFE0E4',
    fontSize: 11,
    marginTop: 4,
  },

  setaMontar: {
    color: CORES.branco,
    fontSize: 29,
    marginLeft: 8,
  },

  tituloCatalogoContainer: {
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tituloCatalogo: {
    color: CORES.branco,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1,
  },

  quantidadeProdutos: {
    color: CORES.cinza,
    fontSize: 11,
  },

  listaProdutos: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  linhaProdutos: {
    justifyContent: 'space-between',
  },

  cartaoProduto: {
    width: '48%',
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: CORES.vinho,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  imagemProduto: {
    height: 115,
    backgroundColor: '#260D13',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  emojiProduto: {
    fontSize: 53,
  },

  nomeProduto: {
    color: CORES.branco,
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 5,
  },

  personagemProduto: {
    color: CORES.vermelho,
    fontSize: 11,
    marginBottom: 7,
  },

  saborProduto: {
    color: CORES.cinza,
    fontSize: 11,
    minHeight: 30,
  },

  precoProduto: {
    color: CORES.branco,
    fontWeight: '900',
    fontSize: 15,
    marginTop: 10,
  },

  verDetalhes: {
    color: CORES.vermelho,
    fontSize: 10,
    fontWeight: '900',
    marginTop: 10,
  },

  indisponivel: {
    color: '#FF7272',
    fontSize: 10,
    fontWeight: '900',
    marginTop: 10,
  },

  semResultados: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 35,
  },

  emojiVazio: {
    fontSize: 48,
    marginBottom: 15,
  },

  textoSemResultados: {
    color: CORES.branco,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  descricaoSemResultados: {
    color: CORES.cinza,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 8,
    lineHeight: 20,
  },

  // MONTAGEM DO SORVETE

  tituloOpcao: {
    color: CORES.vermelho,
    fontWeight: '900',
    fontSize: 16,
    marginTop: 22,
    marginBottom: 12,
  },

  opcaoMontagem: {
    backgroundColor: CORES.campo,
    borderWidth: 1,
    borderColor: '#393939',
    borderRadius: 9,
    padding: 15,
    marginBottom: 9,
  },

  opcaoSelecionada: {
    borderColor: CORES.vermelho,
    backgroundColor: '#300D15',
  },

  textoOpcao: {
    color: CORES.branco,
    fontSize: 14,
  },

  textoOpcaoSelecionada: {
    color: CORES.vermelho,
    fontWeight: '900',
  },
});
