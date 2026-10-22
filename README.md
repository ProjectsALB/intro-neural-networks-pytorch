<div align="center">

# Hyrje në Rrjetet Neurale dhe PyTorch

**Platformë mësimore në shqip dhe notebook-et e plotë të kursit, nga tensorët e parë deri te një projekt klasifikimi.**

[Kursi në Coursera](https://www.coursera.org/learn/deep-neural-networks-with-pytorch) · [Qasja](#qasja-në-platformë) · [Programi](#programi-i-kursit) · [Notebook-et](course-notebooks) · [Ekzekutimi](#ekzekutimi-lokal)

</div>

> **English summary:** An Albanian-language, static learning platform plus the complete Jupyter notebooks for the IBM course *Introduction to Neural Networks and PyTorch* on Coursera (tensors and autograd, datasets, linear and logistic regression, gradient descent, a deep network for classification, and a League of Legends match predictor). Pure HTML, CSS and JavaScript, deployable on Netlify with no build step.

## Përmbajtja

- [Qasja në platformë](#qasja-në-platformë)
- [Programi i kursit](#programi-i-kursit)
- [Veçoritë e platformës](#veçoritë-e-platformës)
- [Struktura e repository-t](#struktura-e-repository-t)
- [Ekzekutimi lokal](#ekzekutimi-lokal)
- [Publikimi në Netlify](#publikimi-në-netlify)
- [Kredite dhe licenca](#kredite-dhe-licenca)

## Qasja në platformë

| | |
|---|---|
| **Linku** | https://rrjetat-neurale.netlify.app/ |
| **Fjalëkalimi** | `12345` |

## Programi i kursit

| Moduli | Tema | Çfarë mëson | Notebook-et |
|:---:|---|---|---|
| 1 | Tensorët, derivatet dhe datasetet | Tensorët 1D dhe 2D, derivatet me `backward()`, `Dataset`, transformimet, MNIST. | `1.1` deri `1.3.3`, `practice` |
| 2 | Regresioni linear 1D | `nn.Linear`, humbja MSE, trajnimi i pjerrësisë dhe bias-it. | `2.1` deri `2.3` |
| 3 | Zbritja e gradientit | SGD, mini-batch, mënyra PyTorch me `DataLoader`, trajnim dhe validim. | `3.1`, `3.2`, `3.3`, `3.6` |
| 4 | Regresioni i shumëfishtë | Shumë veçori, shumë dalje, trajnimi i modelit. | `4.1` deri `4.4` |
| 5 | Regresioni logjistik | Sigmoid, entropia e kryqëzuar, inicializimi i keq. | `5.1`, `5.2.2`, `5.3` |
| 6 | Rrjet neural për klasifikim | Rrjet me shtresa të fshehura për klasifikim binar (Breast Cancer Wisconsin). | `Deep Neural Network for Wine Classification` |
| 7 | Projekti final: League of Legends | Regresion logjistik, rregullim L2, matricë ngatërrese, ROC. | `Final Project League of Legends Match Predictor` |

## Veçoritë e platformës

- 📚 **7 module** me teori në shqipe, terma kyç dhe formula.
- 💻 **Praktiko veten:** ushtrime teorike dhe me kod PyTorch. Shkruan zgjidhjen, e kontrollon dhe e krahason me zgjidhjen e saktë.
- 🧩 **Kodi i kursit:** notebook-et e konvertuara në kod të lexueshëm, të hapshëm direkt në faqe.
- 🗂️ **Flashcards** dhe **fjalor teknik** me kërkim.
- 📝 **Provime** për çdo modul dhe provim final.
- 📈 **Progres** i ruajtur në shfletues (`localStorage`).
- 🔒 **Hyrje me fjalëkalim** para se të hapet platforma.
- 📱 Dizajn responsiv, punon edhe në celular.

## Struktura e repository-t

```
.
├── README.md
├── course-notebooks/
│   ├── 1.1_1Dtensors_v2.ipynb
│   ├── ...                          23 notebook-e (moduli 1 deri 7)
│   ├── index.csv                    etiketat e imazheve (notebook-et 1.3.x)
│   ├── league_of_legends_data_large.csv
│   └── img/                         imazhet fashion*.png
└── platform/
    ├── index.html
    ├── css/style.css
    └── js/
        ├── data.js    modulet, pyetjet, ushtrimet
        ├── code.js    kodi i kursit për faqen
        ├── app.js     logjika e platformës
        └── gate.js    ekrani i hyrjes
```

## Ekzekutimi lokal

**Platforma** (nuk kërkon instalim):

```bash
cd platform
python -m http.server 8000
# hap http://localhost:8000
```

**Notebook-et:**

```bash
pip install torch torchvision matplotlib numpy pandas scikit-learn jupyter
cd course-notebooks
jupyter notebook
```

Notebook-et lexojnë `index.csv`, `img/` dhe CSV-në e projektit nga i njëjti folder, ndaj hapi nga `course-notebooks`. Datasetet MNIST shkarkohen vetë herën e parë që ekzekutohen. Mund t'i hapësh edhe në Google Colab.

## Publikimi në Netlify

1. Në Netlify zgjidh **Add new site**, pastaj **Deploy manually** (ose lidh këtë repository me *Base directory* `platform`).
2. Tërhiq folderin `platform`. Nuk ka komandë build.

## Kredite dhe licenca

Notebook-et janë materiali i kursit [Introduction to Neural Networks and PyTorch](https://www.coursera.org/learn/deep-neural-networks-with-pytorch) të IBM në Coursera (më parë me titull «Deep Neural Networks with PyTorch»). Platforma mësimore dhe përmbajtja në shqip janë ndërtuar për studim personal.

Licenca: shtoje skedarin `LICENSE` me licencën që zgjedh (p.sh. MIT).
