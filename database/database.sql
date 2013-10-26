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