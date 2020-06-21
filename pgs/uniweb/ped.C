// ped.C programa per treure el pedestal de les dades i treu 
// un arxiu de text per cada longitud d'ona 

#include "Riostream.h"
#include "cmath"
#include "TFile.h"
#include "TTree.h"
#include "TF1.h"
#include "TGraph.h"
using namespace std;

int main(int argc, char* argv[])
{
  if (argc !=  2)
    {
      printf("You must write 'ped +_X**-Y**'\n");
      printf("where + is the filter and * the coordenates\n\n");
      return 0;
    }
  
  string befo,lect,afte;
  befo=argv[1];
  lect=argv[1];
  afte=argv[1];
  befo.replace(9,1,"b.root");
  lect.replace(9,1,"l.root");
  afte.replace(9,1,"a.root");
  const char *befor = befo.c_str();
  const char *lectu = lect.c_str();
  const char *after = afte.c_str();
  
  TFile* f = new TFile(befor);
  TTree* t = (TTree*)f->Get("arbre");
  
  const int nentries=t->GetEntries();
  const Int_t n = 110;
  Double_t Va[n],Vb[n],Vc[n],Vd[n],Ve[n],Vf[n]; 
  Double_t a,b,x,y,x2,y2,x3,y3,me=0,me2=0,sig=0,sig2=0,sigt=0; 
  
  t->SetBranchAddress("x",&x);
  t->SetBranchAddress("y",&y);
  
  for(Int_t i = 0; i < nentries; i++)
    {
      t->GetEntry(i);
      Va[i]=x;  
      Vb[i]=y;
      me=me+Vb[i];
    }
  
  TGraph* gr = new TGraph(nentries,Va,Vb);
  gr->Fit("pol1","f");
  
  TF1 *fitinfo = gr->GetFunction("pol1");
  Double_t p0 = fitinfo->GetParameter(0);
  Double_t p1 = fitinfo->GetParameter(1);
  
  Double_t yb= p0+9*p1;
  me=me/nentries;
  for(Int_t i = 0; i < nentries; i++)
    {
      sig=sig+(Vb[i]-me)*(Vb[i]-me);
    }
  sig=sqrt(sig/(nentries-1));
  
  TFile* f2 = new TFile(after);
  TTree* t2 = (TTree*)f2->Get("arbre");
  
  const int nentries2=t2->GetEntries();
  
  t2->SetBranchAddress("x",&x2);
  t2->SetBranchAddress("y",&y2);
  
  for(Int_t i = 0; i < nentries2; i++)
    {
      t2->GetEntry(i);
      Vc[i]=x2;  
      Vd[i]=y2;
      me2=me2+Vd[i];
    }
  
  TGraph* gr2 = new TGraph(nentries2,Vc,Vd);
  gr2->Fit("pol1","f");
  
  TF1 *fitinfo2 = gr2->GetFunction("pol1");
  Double_t ya = fitinfo2->GetParameter(0);
  
  me2=me2/(nentries2);
  for(Int_t i = 0; i < nentries2; i++)
    {
      sig2=sig2+(Vd[i]-me2)*(Vd[i]-me2);
    }
  sig2=sqrt(sig2/(nentries2-1));
    
  //el 1.4 es perque estem suposant que l'error de la resta final es la 
  //propagacio de l'error de la lectura i del pedestal:
  //
  // dC = sqrt(dA²+dB²)=sqrt(2dA²)=sqrt(2)*dA=1.4*dA
  
  if (sig>sig2) sigt=1.4*sig; else sigt=1.4*sig2;
  
  Double_t fi,fe;
  
  if (lect[0]=='2') {fi=300; fe=450;}
  if (lect[0]=='3') {fi=400; fe=750;}
  if (lect[0]=='4') {fi=700; fe=1200;}   
  
  b=-(fi*ya-fe*yb)/(fe-fi);
  a=(yb-b)/fi;
  
  TFile* f3 = new TFile(lectu);
  TTree* t3 = (TTree*)f3->Get("arbre");
  
  const int nentries3=t3->GetEntries();
  
  t3->SetBranchAddress("x",&x3);
  t3->SetBranchAddress("y",&y3);
  
  for(Int_t i = 0; i < nentries3; i++)
    {
      t3->GetEntry(i);
      Ve[i]=x3;
      Vf[i]=y3-((a*x3)+b);
    }
  
  FILE * pFile;
  
  lect.erase (1,2);  
  lect.erase (3,2); 
  lect.erase (5,6); 
  lect.replace(5,4,".dat");
  
  lectu = lect.c_str();
  
  pFile = fopen (lectu,"w");
  
  for (Int_t j=0; j<nentries3;j++)
    {
      fprintf (pFile, "%f %f %f\n",Ve[j],Vf[j],sigt);
    }
  
  fclose (pFile);
}
