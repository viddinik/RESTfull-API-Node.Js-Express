const router = require('express').Router();
let data = require('../data.js');

router.get("/", (req, res) => {
    res.status(200).json(data);
});

let next_id = 5;

router.post("/", (req, res, next) => {
    let yeni_isim = req.body;

    if (!yeni_isim.isim) {
        next({
            statusCode: 400,
            errorMessage: "isim ekleyin lütfen",
        });
    } else if (yeni_isim.isim && !yeni_isim.isim) {
        next({
            statusCode: 400,
            errorMessage: "lütfen bir şey ekleyiniz.",
        });

    } else {
        yeni_isim.id = next_id;
        next_id++;
        data.push(yeni_isim);
        res.status(201).json(yeni_isim);
    }
});

router.delete("/:id", (req, res) => {
    const sılınecek_isim_id = req.params.id;
    const sılınecek_id = data.find(liste => liste.id === Number(sılınecek_isim_id))

    if (sılınecek_id) {
        data = data.filter(liste => liste.id !== Number(sılınecek_isim_id));
        res.status(204).end();
    } else {
        res.status(404).json({ errorMessage: "silmeye çalıştığınız isim sistemde yok " });

    }
});

router.get("/:id", (req, res) => {
    console.log("req.body", req.body);
    const { id } = req.params;
    const liste = data.find(liste => liste.id == parseInt(id));

    if (liste) {
        res.status(200).json(liste);
    } else {
        res.status(404).send("listede isim bulunamadı..mert");
    }
});

module.exports = router;