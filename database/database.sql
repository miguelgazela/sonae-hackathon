CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	password TEXT
);

CREATE TABLE produtos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	idCategoria INTEGER,
	name TEXT,
	marca TEXT,
	descricao TEXT,
	preco TEXT,
	precoAlternativo TEXT,
	imagemSmall TEXT,
	imagemLarge TEXT,
	FOREIGN KEY(idCategoria) REFERENCES categoria(idCategoria) ON DELETE CASCADE
);

CREATE TABLE categoria (
	idCategoria INTEGER PRIMARY KEY AUTOINCREMENT,
	nome TEXT
);

CREATE TABLE produtosComprados (
	idUser INTEGER,
	idProduto INTEGER,
	PRIMARY KEY (idUser, idProduto),
	FOREIGN KEY(idUser) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(idProduto) REFERENCES produtos(id) ON DELETE CASCADE
);

CREATE TABLE produtosFavoritos (
	idUser INTEGER,
	idProduto INTEGER,
	PRIMARY KEY (idUser, idProduto),
	FOREIGN KEY(idUser) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(idProduto) REFERENCES produtos(id) ON DELETE CASCADE
);

CREATE TABLE listas (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	idResponsavel INTEGER,
	FOREIGN KEY(idResponsavel) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE listasUsers (
	idLista INTEGER,
	idUser INTEGER,
	PRIMARY KEY (idLista, idUser),
	FOREIGN KEY(idUser) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(idLista) REFERENCES listas(id) ON DELETE CASCADE
);

CREATE TABLE listasProdutos (
	idLista INTEGER,
	idProduto INTEGER,
	quantidade INTEGER,
	PRIMARY KEY(idLista, idProduto),
	FOREIGN KEY(idLista) REFERENCES listas(id) ON DELETE CASCADE,
	FOREIGN KEY(idProduto) REFERENCES produtos(id) ON DELETE CASCADE
);

CREATE TABLE produtosCarrinho (
	idUser INTEGER,
	idProduto INTEGER,
	quantidade INTEGER,
	PRIMARY KEY(idUser, idProduto),
	FOREIGN KEY(idUser) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(idProduto) REFERENCES produtos(id) ON DELETE CASCADE
);

insert into users values(null, "Miguel", "password");
insert into users values(null, "Caldas", "password");
insert into users values(null, "Rui", "password");
insert into users values(null, "David", "password");
insert into users values(null, "Diana", "password");
insert into users values(null, "Magano", "password");
insert into users values(null, "Pedro", "password");

insert into categoria values(null, "Mercearia");
insert into categoria values(null, "Bebidas");
insert into categoria values(null, "Frescos");
insert into categoria values(null, "Laticínios");
insert into categoria values(null, "Congelados");
insert into categoria values(null, "Bebé");
insert into categoria values(null, "Higiene");
insert into categoria values(null, "Limpeza");
insert into categoria values(null, "Casa");
insert into categoria values(null, "Animais");
insert into categoria values(null, "Lazer");

insert into produtos values(null, 1, "Pêssego em Calda", "Globo", "emb. 820 gr", "2,79 /un", "11,16 /kg", "img/small/1.jpeg", "img/large/1.jpeg");
insert into produtos values(null, 1, "Pudim de Caramelo", "Continente", "emb. 90 gr", "0,34 /un", "3,78 /kg", "img/small/2.jpeg", "img/large/2.jpeg");
insert into produtos values(null, 1, "Feijão Frade","Continente","emb. 830 gr","€0,89 /un","€1,07/ kg","img/small/3.jpeg", "img/large/3.jpg");
insert into produtos values(null, 2, "Vodka","Moskovskaya","garrafa 70 cl","€10,79 /un","€15,41/ lt","img/small/4.jpeg", "img/large/4.jpg");
insert into produtos values(null, 2, "Água sem Gás","Continente","emb. 6 x 33 cl","€0,60 /un","€0,30/ lt","img/small/5.jpeg", "img/large/5.jpg");
insert into produtos values(null, 2, "Vinho Tinto","Vinha do Poeta","garrafa 75 cl","€2,69 /un","€0,30/ lt","img/small/6.jpeg", "img/large/6.jpg");
insert into produtos values(null, 3, "Tremoço 11","Continente","emb. 800 gr","€3,29 /un","€4,11/ kg","img/small/7.jpeg", "img/large/7.jpg");
insert into produtos values(null, 3, "Framboesa","Seleção","emb. 125 gr","€2,59 /un","€20,72/ kg","img/small/8.jpeg", "img/large/8.jpg");
insert into produtos values(null, 3, "Cebola Branca","Seleção","emb. 500 gr","€2,49 /un","€4,98/ kg","img/small/9.jpeg", "img/large/9.jpg");
insert into produtos values(null, 4, "Iogurte Kit Kat","Nestlé","emb. 2 x 115 gr","€1,99 /un","€4,98/ kg","img/small/10.jpeg", "img/large/10.jpg");
insert into produtos values(null, 4, "Ovos Classe L","Saborosos","6 un","€1,09 /un","€2,18/ dúzia","img/small/11.jpeg", "img/large/11.jpg");
insert into produtos values(null, 4, "Queijo Nisa Dop","Saborosos","emb. 310 gr","€6,99 /un","€22,55 /kg","img/small/12.jpeg", "img/large/12.jpg");
insert into produtos values(null, 5, "Douradinhos Frango","Capitão Iglo","10 un","€3,25 /un","€13,00 /kg","img/small/13.jpeg", "img/large/13.jpg");
insert into produtos values(null, 5, "Gelado Stracciatela","Continente","emb. 1 lt","€2,69 /un","€2,69 /lt","img/small/14.jpeg", "img/large/14.jpg");
insert into produtos values(null, 5, "Bolo de Bolacha","Continente","emb. 1 kg","€1,99 /un","€1,99 /kg","img/small/15.jpeg", "img/large/15.jpg");
insert into produtos values(null, 6, "Condicionador Kids","Continente","1 un","€0,77 /un","€0,77 /un","img/small/16.jpeg", "img/large/16.jpg");
insert into produtos values(null, 6, "Soro Fisiológico","Continente","emb. 60 ml","€0,39 /un","€6,50/ lt","img/small/17.jpeg", "img/large/17.jpg");
insert into produtos values(null, 6, "Esponja Bebé", "Continente", "1 un", "2,29 /un", "2,29 /un", "img/small/18.jpeg", "img/large/18.jpeg");
insert into produtos values(null, 7, "Pasta de Dentes", "Colgate", "emb. 75 ml", "2,99 /un", "39,87/ lt", "img/small/19.jpeg", "img/large/19.jpeg");
insert into produtos values(null, 7, "After Shave", "Denim", "emb. 100 ml", "7,97 /un", "79,70/ lt", "img/small/20.jpeg", "img/large/20.jpeg");
insert into produtos values(null, 7, "Escova de Dentes", "Aquafresh", "1 un", "3,09 /un", "3,09 /un", "img/small/21.jpeg", "img/large/21.jpeg");
insert into produtos values(null, 8, "Branqueador", "Iberia", "emb. 250 gr", "3,79 /un", "15,16/ kg", "img/small/22.jpeg", "img/large/22.jpeg");
insert into produtos values(null, 8, "Lava Tudo Amoniacal", "Continente", "1 lt", "0,41 /un", "0,41 /lt", "img/small/23.jpeg", "img/large/23.jpeg");
insert into produtos values(null, 8, "Amaciador Roupa ", "Continente", "emb. 4 lt", "1,49 /un", "0,04/ dose", "img/small/24.jpeg", "img/large/24.jpeg");
insert into produtos values(null, 9, "Pilhas Alcalinas", "Continente", "2 un", "4,19 /un", "4,19 /un", "img/small/25.jpeg", "img/large/25.jpeg");
insert into produtos values(null, 9, "Tapa Tomada", "Continente", "1 un", "2,19 /un", "2,19 /un", "img/small/26.jpeg", "img/large/26.jpeg");
insert into produtos values(null, 9, "Spray Limpa Vidros", "Continente", "emb. 1 lt", "3,59 /un", "3,59/ lt", "img/small/27.jpeg", "img/large/27.jpeg");
insert into produtos values(null, 10, "Croquetes para Cão", "Continente", "emb. 4 kg", "4,99 /un", "1,25/ kg", "img/small/28.jpeg", "img/large/28.jpeg");
insert into produtos values(null, 10, "Barritas para Cão", "Continente", "emb. 5 un", "2,74 /un", "2,74 /un", "img/small/29.jpeg", "img/large/29.jpeg");
insert into produtos values(null, 10, "Alimento Seco para Cão Júnior", "Continente", "emb. 2 kg", "2,99 /un", "1,50/ kg", "img/small/30.jpeg", "img/large/30.jpeg");
insert into produtos values(null, 11, "Rato Óptico sem Fio", "Kunft", "1 un", "9,99 /un", "9,99 /un", "img/small/31.jpeg", "img/large/31.jpeg");
insert into produtos values(null, 11, "Corrector Frasco", "Note.It", "2 un", "1,69/un", "1,69/un", "img/small/32.jpeg", "img/large/32.jpeg");
insert into produtos values(null, 11, "Pins Coloridos", "Continente", "60 un", "1,79 /un", "1,79 /un", "img/small/33.jpeg", "img/large/33.jpeg");

insert into listas values(null, "Hachathon Sonae", 1);
insert into listas values(null, "Aniversário", 3);

insert into listasUsers values(1, 1);
insert into listasUsers values(1, 2);
insert into listasUsers values(1, 4);
insert into listasUsers values(2, 1);



