---
title: "[CS229] Summary + Notes"
date: 2025-02-04 08:00:00 +09:00
categories: [ML, Basic ML]
tags: []       
math: true
layout: post
author: birm
---
## Intro
I personally organized the importants parts of the lecture in handwriting. 
The details for the mathematical derivation can be found in the lecture notes (which is public), or the handwritten notes. (will provide here)
**Each Lecture covers the following topics.**
## Lecture 1
**Intro**: **Various types** of Machine Learning
## Lecture 2
**Linear Regression.** We estimate as, $h(x) = \theta^T x$, and minimize MSE loss. We solve this by Gradient descent, or solving the normal equation.

**Gradient descent:** We update weights by plugging as:

$$
\theta \leftarrow \theta - \eta \frac{\partial}{\partial \theta}l(\theta) 
$$

## Lecture 3
**Locally weighted LR**. LR with weights.            
**MLE: Maximum likeliood estimation**, which is a natural idea for choosing weights which is to maximize the log-likelihood, defined as
$$
l(\theta) = log(L(\theta)) = log(p(\vec{y} \,| \,x\,;\theta))
$$           
**Logistic Regression** using LR. We set the model as $h(x) = g(\theta^T x)$ when $g$ is the sigmoid function.            
## Lecture 4
Basic **perceptrons**, which is a classifier using the **sign of $\theta^T x$.**           
**Exponential family,** which is a **PDF** which has the form defined as:               
$$
P(y\,;\eta) = b(y)\,exp[\eta^TT(y)-a(\eta)]
$$
$\eta$, $T(y)$, $b(y)$, $a(\eta)$ is called as the Natural parameter, sufficient statistic, Base measure, and Log-partition.             

$T(y)=y$ will be used in the lecture, and $y$ **is a scalar**, while $\eta$ **can be a vector.**           
Bernoulli and Gaussian can be written in this form.         

**Generalized Linear Models.** A generalized form of Linear Models using Exponential family.        
We assume that,        
(1) $y$ | $x\,;\theta$ ~ ExponentialFamily$(\eta)$        
(2) $\eta = \theta^T x$         
(3) $h(x) = \mathbb{E} [y|x\,;\theta\,]$ (output for test time)           
In real usage, we use $E[y\,;\eta\,] = \mu$ which is the canonical response function.           
## Lecture 5         
Until now, we learned discriminative models (Which learns $p(y|x)$)         
From now, we deal with basic Generative models (Which learns $p(x|y)$)        
      
**GDA** (Gaussian Discriminant Analysis). For a binary classifier, we model $p(x|y=0)$ and $p(x|y=1)$ as multivariate gaussian.        
We calculate the Joint Likelihood, and use MLE.         
      
**Naive Bayes** method, which is similar and can be used for spam mail classification.         
For the word list and given data, we calculate $p(x_j = 1 | y = 1)$, which is the prob of the $j$th word in the mail given the mail is spam (or not).       
We can use methods as **Laplace Smoothing** to make accurate assumptions.       
## Lecture 6        
**SVM** (Support Vector Machines), which is a method that we map data to higher dimensions, in order to get better classification.

We first drop the $x_0 = 1$ convention, and model as $g(w^T x +b)$. 
Then we choose $w, b$ to maximize the margin $\gamma$. 
It can be rewrited as 
$$
\min_{w,b} ||w||^2   \,\, (s.t. y^{(i)}(w^Tx^{(i)}+b) \geq 1)
$$
The superscript $(i)$ denotes the $i$'th data.
## Lecture 7
**Derivation of SVM**. 
By representation theorem, the optimal $w$ at Lec 6 can be written as:
$$
w = \sum_{i}\alpha_i y^{(i)}x^{(i)}
$$
So, to minimize $||w||^2$, we need inner products (i.e. $<w_i, w_j>$)
We use a map (called kernel) $\phi(x)$, which makes fast inner product. 
(Fast caluclation for $\phi(x)^T \phi(z)$, and fast transform to $x^Tz$.)
## Lecture 8
Basic ideas about **Learning Theory.** 
It talks about bias/variance and over/underfitting, then talks about regularization and the 2 views of ML (Frequentist, Baeysian : Maybe supervised learning?) 
Finally talks about the ways used to train models. (Making train, dev, test set and doing cross validation + K-Fold validation)
## Lecture 9
**Learning Theory** continued. 
Parameter view of bias/variance, and decomposing error to var, bias, and irreducible error. Methods to deal high var/bias and **var/bias tradeoff.**
**ERM** and about the bounds between ERM and theortical best values. (about prob of error $\delta$, margin of error $\gamma$, sample size $m$, $|H| = K$ for finite or VC dim..)

Think) Bias-Variance is actually a hard concept to understand exactly.. only get the feelings
Var of outputs, Var of parameters..
## Lecture 10
**Decision Trees and Ensemble methods.**
About the **loss functions** of decision trees (misclassification, cross entropy, gini) and how to make trees, how to regularize (avoid overfitting)
**Ensemble methods** to increase predict accuracy - bagging (Random Forests) and boosting (AdaBoost, XGBoost...)
This lecture gives only the **brief description.**
## Lecture 11, 12
About Neural Networks; which is things that I learned from SNU classes
So skipping :)
## Lecture 13
About debugging ML models and error analysis
## Lecture 14
Starting about **unsupervised learning.**
About K-means clustering, Density Estimation by Gaussian Mixture Models.
