// spect.C programa per plotar tot l'espectre en una coordenada

#include "Riostream.h"
#include "TRint.h"
#include "TCanvas.h"
#include "TFile.h"
#include "TTree.h"
#include "TStyle.h"
#include "TAxis.h"
#include "TLegend.h"
#include "TMultiGraph.h"
#include "TGraphErrors.h"
#include "Style.C"
using namespace std;

int main(int argc, char* argv[])
{
  if (argc !=  3)
    {
      printf("You must write 'spect coordX coordY'\n\n");
      return 0;
    }
  
  TRint *App = new TRint ("App",0, 0, 0, 0, kTRUE);
  
  string cX,cY,tit1,tit2,tit3,q;
  cX=argv[1];
  cY=argv[2];
  
  Int_t w,v;
  w = atoi (argv[1]);
  v = atoi (argv[2]);
  if (v>31||w>31){printf("\n les coordenades van de 0 a 31\n\n");return 0;}
  
  tit1="20000.dat";
  tit1.replace(1,2,cX);
  tit1.replace(3,2,cY);
  const char *fin1 = tit1.c_str();
  
  ifstream in;
  in.open(fin1);
  
  tit1.replace(5,4,".root");  
  fin1 = tit1.c_str();
  
  Double_t x,y,ey;
  Int_t nlines = 0;
  TFile *f = new TFile(fin1,"RECREATE");
  TTree *t = new TTree("arbre","passar d'arxiu a vector");
  t->Branch("x",&x,"x/D");
  t->Branch("y",&y,"y/D");
  t->Branch("ey",&ey,"ey/D");
  
  while (1) {
    in >> x >> y >> ey;
    if (!in.good()) break;
    t->Fill();
    nlines++;
  }
  
  in.close();
  f->Write();
  
  tit2="30000.dat";
  tit2.replace(1,2,cX);
  tit2.replace(3,2,cY);
  
  const char *fin2 = tit2.c_str();
  
  ifstream in2;
  in2.open(fin2);
  
  tit2.replace(5,4,".root");  
  fin2 = tit2.c_str();
  
  Double_t x2,y2,ey2;
  Int_t nlines2 = 0;
  TFile *f2 = new TFile(fin2,"RECREATE");
  TTree *t2 = new TTree("arbre","passar d'arxiu a vector");
  t2->Branch("x",&x2,"x/D");
  t2->Branch("y",&y2,"y/D");
  t2->Branch("ey",&ey2,"ey/D");
  
  while (1) {
    in2 >> x2 >> y2 >> ey2;
    if (!in2.good()) break;
    t2->Fill();
    nlines2++;
  }
  
  in2.close();
  f2->Write();
  
  tit3="40000.dat";
  tit3.replace(1,2,cX);
  tit3.replace(3,2,cY);
  const char *fin3 = tit3.c_str();
  ifstream in3;
  in3.open(fin3);
  
  tit3.replace(5,4,".root");  
  fin3 = tit3.c_str();
  
  Double_t x3,y3,ey3;
  Int_t nlines3 = 0;
  TFile *f3 = new TFile(fin3,"RECREATE");
  TTree *t3 = new TTree("arbre","passar d'arxiu a vector");
  t3->Branch("x",&x3,"x/D");
  t3->Branch("y",&y3,"y/D");
  t3->Branch("ey",&ey3,"ey/D");
  
  while (1) {
    in3 >> x3 >> y3 >> ey3;
    if (!in3.good()) break;
    t3->Fill();
    nlines3++;
  }
  
  in3.close();
  f3->Write();
  
  q=" ";
  q.replace(0,1,argv[1]);
  q.replace(2,1,argv[2]);
  const char *qq = q.c_str();
  
  TCanvas* p = new TCanvas(qq,"Spectrum",200,10,800,500); 
  Style();
  
  const int nentries=t->GetEntries();
  const Int_t n = 110;
  Double_t Va2[n],Vae2[n],Vb2[n],Vbe2[n],Va3[n],Vae3[n],Vb3[n],Vbe3[n],Va4[n],Vae4[n],Vb4[n],Vbe4[n]; 
  
  for(Int_t i = 0; i < nentries; i++)
    {
      t->GetEntry(i);
      Va2[i]=x;  
      Vb2[i]=y;
      Vae2[i]=0;
      Vbe2[i]=ey;
    }
  
  const int nentries2=t2->GetEntries();
  
  for(Int_t i = 0; i < nentries2; i++)
    {
      t2->GetEntry(i);
      Va3[i]=x2;  
      Vb3[i]=y2;
      Vae3[i]=0;
      Vbe3[i]=ey2;
    }
  
  const int nentries3=t3->GetEntries();
  
  for(Int_t i = 0; i < nentries3; i++)
    {
      t3->GetEntry(i);
      Va4[i]=x3;  
      Vb4[i]=y3;
      Vae4[i]=0;
      Vbe4[i]=ey3;
    }

  string titulo;
  titulo=tit2;
  titulo.replace(0,1,"X");  
  titulo.replace(3,0,"-Y");
  titulo.erase(7,5);
  const char *fini = titulo.c_str();
  
  TMultiGraph *mg = new TMultiGraph();
  mg->SetTitle(fini);
  p->SetGridy();
  
  TGraphErrors* gr2 = new TGraphErrors(nentries,Va2,Vb2,Vae2,Vbe2);
  gr2->SetLineColor(kBlue);
  gr2->SetMarkerColor(4);
  mg->Add(gr2);
  
  TGraphErrors* gr3 = new TGraphErrors(nentries2,Va3,Vb3,Vae3,Vbe3);
  gr3->SetLineColor(kRed);
  gr3->SetMarkerColor(4);
  mg->Add(gr3);
  
  TGraphErrors* gr4 = new TGraphErrors(nentries3,Va4,Vb4,Vae4,Vbe4);
  gr4->SetLineColor(kGreen);
  gr4->SetMarkerColor(4);
  
  mg->Add(gr4);
  mg->SetMinimum(0);
  mg->Draw("alp");
  mg->GetXaxis()->SetTitle("Wavelength (nm)"); 
  mg->GetYaxis()->SetTitle("Voltage (mV)");
  
  TLegend *leg = new TLegend(0.195098,0.5583456,0.3872549,0.6824225);
  leg->AddEntry(gr2,"2n filtre","l");
  leg->AddEntry(gr3,"3r filtre","l");
  leg->AddEntry(gr4,"4t filtre","l");
  leg->Draw();
  p->Modified();
  
  remove(fin1);
  remove(fin2);
  remove(fin3);
  App->Run();
}
