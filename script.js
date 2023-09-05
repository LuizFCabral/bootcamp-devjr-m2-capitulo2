//mascara do telefone
$("#telefone").mask("(99) 9999-99999");

//Quantidade
function wcqib_refresh_quantity_increments() {
	jQuery(
		"div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)"
	).each(function (a, b) {
		var c = jQuery(b);
		c.addClass("buttons_added"),
			c
				.children()
				.first()
				.before('<input type="button" value="-" class="minus" />'),
			c
				.children()
				.last()
				.after('<input type="button" value="+" class="plus" />');
	});
}
String.prototype.getDecimals ||
	(String.prototype.getDecimals = function () {
		var a = this,
			b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		return b
			? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0))
			: 0;
	}),
	jQuery(document).ready(function () {
		wcqib_refresh_quantity_increments();
	}),
	jQuery(document).on("updated_wc_div", function () {
		wcqib_refresh_quantity_increments();
	}),
	jQuery(document).on("click", ".plus, .minus", function () {
		var a = jQuery(this).closest(".quantity").find(".qty"),
			b = parseFloat(a.val()),
			c = parseFloat(a.attr("max")),
			d = parseFloat(a.attr("min")),
			e = a.attr("step");
		(b && "" !== b && "NaN" !== b) || (b = 0),
			("" !== c && "NaN" !== c) || (c = ""),
			("" !== d && "NaN" !== d) || (d = 0),
			("any" !== e &&
				"" !== e &&
				void 0 !== e &&
				"NaN" !== parseFloat(e)) ||
				(e = 1),
			jQuery(this).is(".plus")
				? c && b >= c
					? a.val(c)
					: a.val((b + parseFloat(e)).toFixed(e.getDecimals()))
				: d && b <= d
				? a.val(d)
				: b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())),
			a.trigger("change");
	});

//Calcular
function calcular() {
	//Sistema
	$("#lista").empty();
	$("#info-compra").show();

	//Items
	let precoFinal = 0;
	const itens = [
		{
			descr: "Bife com batata",
			preco: 30,
			qtd: 0,
		},
		{
			descr: "Coxa de Frango Crocante",
			preco: 25,
			qtd: 0,
		},
		{
			descr: "Carne de panela",
			preco: 22,
			qtd: 0,
		},
		{
			descr: "Farofa",
			preco: 10,
			qtd: 0,
		},
		{
			descr: "Salada",
			preco: 8,
			qtd: 0,
		},
		{
			descr: "Torresmo",
			preco: 12,
			qtd: 0,
		},
	];

	//Usuário
	let nome = $("#nome").val();
	$("#tittle-compra").text(`${nome}`);

	//Calculo da compra
	let qtd = $(".input-text");
	for (let i = 0; i < qtd.length; i++) {
		if (parseFloat(qtd.eq(i).val()) !== 0) {
			let subtotal = 0;
			itens[i].qtd = parseFloat(qtd.eq(i).val());
			subtotal = itens[i].qtd * itens[i].preco;
			precoFinal += subtotal;
			$("#lista").append(
				`<li>Prato: ${itens[i].descr} - Preço unitário: R$ ${itens[
					i
				].preco
					.toFixed(2)
					.replace(".", ",")} - Quantidade: ${
					itens[i].qtd
				} - Total: R$ ${subtotal.toFixed(2).replace(".", ",")}.</li>`
			);
		}
	}
	$("#preco-final").text(
		`Preço final R$ ${precoFinal.toFixed(2).replace(".", ",")}`
	);
}
